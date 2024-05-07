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

//Not work yet
export async function getUsersRoleCounts() {
  try {
    const userCounts = await prisma.user.aggregate({
      _count: {
        seller: {
          count: {
            itemSaleHistoryAsSeller: {
              _distinct: true,
            },
          },
        },
        buyer: {
          count: {
            itemSaleHistoryAsBuyer: {
              _distinct: true,
            },
          },
        },
        bothSellerAndBuyer: {
          count: {
            _and: [
              { itemSaleHistoryAsSeller: { _count: { gt: 0 } } },
              { itemSaleHistoryAsBuyer: { _count: { gt: 0 } } },
            ],
          },
        },
      },
    });
    return userCounts;
  } catch (error) {
    throw new Error(`Unable to fetch user role counts: ${error}`);
  }
}

// Not work yet
export async function getMostSellingUser() {
  try {
    const mostSellingUser = await prisma.user.findFirst({
      orderBy: {
        _count: {
          itemSaleHistoryAsSeller: "desc",
        },
      },
    });

    return mostSellingUser;
  } catch (error) {
    throw new Error(`Unable to fetch the most selling user: ${error}`);
  }
}

// export async function (){
// }
