"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Done it work
export async function getAllItems() {
  try {
    const items = await prisma.item.findMany();
    return items;
  } catch (error) {
    throw new Error(`Unable to fetch items: ${error}`);
  }
}
//Done it work
export async function getTotalSalesCount() {
  try {
    const count = await prisma.itemSaleHistory.count();
    return count;
  } catch (error) {
    throw new Error(`Unable to fetch total sales count: ${error}`);
  }
}

// Q1 : Total amount of purchases per item and per year
export async function getTotalPurchasesPerItemPerYear() {
  try {
    const totalPurchases = await prisma.itemSaleHistory.groupBy({
      by: ["itemName", { year: { dateOfPurchase: true } }],
      _sum: {
        totalPrice: true,
      },
    });
    return totalPurchases;
  } catch (error) {
    throw new Error(
      `Unable to fetch total purchases per item per year: ${error}`
    );
  }
}

// Q2: The most 3 items bought over the last 6 months (not work yet)
export async function getTop3ItemsLastSixMonths() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const result = await prisma.itemSaleHistory.groupBy({
    by: ["itemId"],
    where: {
      dateOfPurchase: {
        gte: sixMonthsAgo,
      },
    },
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        total_purchases: "desc",
      },
    },
  });
  console.log(`DONE :::: ${result}`);
  return result;
}

// Q2: The most 3 items bought over the last 6 months
 async  getTop3ItemsLastSixMonths() {

  // const result = await prisma.itemSaleHistory.findMany({
  //   where: {
  //     dateOfPurchase: {
  //       gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
  //     },
  //   },
  //   select: {
  //     item: {
  //       select: {
  //         itemName: true,
  //       },
  //     },
  //     _count: {
  //       select: {
  //         quantity: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     _count: {
  //          quantity: "desc",
  //     },
  //   },
  //   take: 3,
  //   select: {
  //     itemId: true,
  //     _sum: {
  //       quantity: true,
  //     },
  //   },
  // });
  console.log(`DONE :::: ${result}`);
     

  const top3Items = await Promise.all(
    result.map(async (item) => {
      const itemName = await prisma.item.findOne({
        where: {
          itemId: item.itemId,
        },
        select: {
          itemName: true,
        },
      });
      return { itemName: itemName.itemName, quantity: item._sum.quantity };
    })
  );

  console.log(`DONE :::: ${JSON.stringify(top3Items)}`);
  return top3Items;
}

// Q3 : The categories never purchased
export async function getCategoriesNeverPurchased() {
  const result = await prisma.item.findMany({
    where: {
      itemSaleHistory: {
        none: {},
      },
    },
    select: {
      category: true,
    },
    distinct: ["category"],
  });
  console.log(`DONE :::: ${result}`);

  return result;
  }

  async getAllItems() {
    try{
      return await prisma.item.findMany()
    }
    catch(error){
      return {error}
    }
  }

// Q4 : The total number of items in our website (work)
export async function getTotalItems() {
  try {
    const count = await prisma.item.count();
    return count;
  } catch (error) {
    throw new Error(`Unable to fetch total items: ${error}`);
  }
}

// Q5 : The average of item price in our website (work)
export async function getAverageItemPrice() {
  try {
    const result = await prisma.item.aggregate({
      _avg: {
        price: true,
      },
    });
    return result._avg.price;
  } catch (error) {
    throw new Error(`Unable to fetch average item price: ${error}`);
  }
}
