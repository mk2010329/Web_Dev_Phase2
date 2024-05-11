import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Done work
export async function getAllUsers() {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    throw new Error(`Unable to fetch all users: ${error}`);
  }
}

//Done work
export async function getTotalUsers() {
  try {
    const count = await prisma.user.count();
    return count;
  } catch (error) {
    throw new Error(`Unable to fetch total users: ${error}`);
  }
}

// Q1 : it get buyers per location (It work)
export async function getBuyersPerLocation() {

  const result = await prisma.user.groupBy({
    by: ["shippingAddress"],
    _count: { shippingAddress: true }
  });

  return result;
}

// Q2 : it get most selling user (it work)
export async function getMostSellingUsers() {
  try {
    const mostSellingUser = await prisma.user.findMany({
      orderBy: {
        itemSaleHistoryAsSeller: {
          _count: "desc",
        },
      },
    });
    return mostSellingUser;
  } catch (error) {
    throw new Error(`Unable to fetch the most selling user: ${error}`);
  }
}

// Q3 : these queryes get be useful as combnation (It work )
// Get users who sell only
export async function getSellerUsersWithItemCount() {
  try {

    const sellerUsers = await prisma.currentlySellingItem.groupBy({
      by: ["username"],
      _count: { username: true }
    });

    return sellerUsers;
  } catch (error) {
    throw new Error(`Unable to fetch seller users with item count: ${error}`);
  }
}

// Get users who buy only
export async function getBuyerUsersWithItemCount() {
  try {

    const buyerUsersWithItemCount = await prisma.itemSaleHistory.groupBy({
      by: ["boughtByUsername"],
      _count: { boughtByUsername: true }
    });

    return buyerUsersWithItemCount;
  } catch (error) {
    throw new Error(`Unable to fetch buyer users with item count: ${error}`);
  }
}

// Get users who sell and buy at the same time
export async function getBothSellersAndBuyers() {
  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            itemSaleHistoryAsSeller: {
              some: {},
            },
          },
          {
            itemSaleHistoryAsBuyer: {
              some: {},
            },
          },
        ],
      },
      select: {
        username: true,
        name: true,
        surname: true,
        itemSaleHistoryAsSeller: {
          select: {
            itemId: true,
          },
        },
        itemSaleHistoryAsBuyer: {
          select: {
            itemId: true,
          },
        },
      },
    });

    const usersWithItemCount = users.map((user) => {
      const sellerItemCount = user.itemSaleHistoryAsSeller.length;
      const buyerItemCount = user.itemSaleHistoryAsBuyer.length;
      return {
        username: user.username,
        name: user.name,
        surname: user.surname,
        sellerItemCount: sellerItemCount,
        buyerItemCount: buyerItemCount,
      };
    });

    return usersWithItemCount;
  } catch (error) {
    throw new Error(
      `Unable to fetch users who are both sellers and buyers with item counts: ${error}`
    );
  }
}
