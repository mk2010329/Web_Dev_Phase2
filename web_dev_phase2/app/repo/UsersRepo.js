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
  const userData = await prisma.user.findMany({
    select: {
      shippingAddress: true,
      itemSaleHistoryAsBuyer: {
        select: {
          boughtByUsername: true,
        },
      },
    },
  });

  const result = userData.reduce((acc, curr) => {
    const location = curr.shippingAddress;
    const buyers = new Set(
      curr.itemSaleHistoryAsBuyer.map(
        ({ boughtByUsername }) => boughtByUsername
      )
    );

    if (!acc[location]) {
      acc[location] = { numBuyers: 0, location };
    }

    acc[location].numBuyers = buyers.size;

    return acc;
  }, {});

  return result;
}

// Q2 : it get most selling user (it work)
export async function getMostSellingUser() {
  try {
    const mostSellingUser = await prisma.user.findFirst({
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
export async function getSellerUsers() {
  return await prisma.user.findMany({
    where: {
      itemSaleHistoryAsSeller: {
        some: {},
      },
    },
    select: {
      username: true,
      name: true,
      surname: true,
    },
  });
}

// Get users who buy only
export async function getBuyerUsers() {
  return await prisma.user.findMany({
    where: {
      itemSaleHistoryAsBuyer: {
        some: {},
      },
    },
    select: {
      username: true,
      name: true,
      surname: true,
    },
  });
}

// Get users who sell and buy at the same time
export async function getBothSellersAndBuyers() {
  return await prisma.user.findMany({
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
    },
  });
}
