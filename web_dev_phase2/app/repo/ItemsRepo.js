
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ItemsRepo{

  // Q1 : Total amount of purchases per item and per year
   async  getTotalPurchasesPerItemPerYear() {
  const result = await prisma.itemSaleHistory.groupBy({
    //SQLite function to extract the year from a date.
    by: ["item.itemName", 'STRFTIME("%Y", dateOfPurchase) as year'],
    _sum: {
      total_purchases: true,
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
  const result = await prisma.itemSaleHistory.findMany({
    where: {
      dateOfPurchase: {
        gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      item: {
        select: {
          itemName: true,
        },
      },
      _count: {
        select: {
          quantity: true,
        },
      },
    },
    orderBy: {
      _count: {
        quantity: "desc",
      },
    },
    take: 3,
  });
  console.log(`DONE :::: ${result}`);

  return result;
}

// Q3 : The categories never purchased
 async  getCategoriesNeverPurchased() {
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

}

export default new ItemsRepo();

// test Q it did not work to make me test the code
// export default async function test() {
//   console.log("Start !!!!");
//   const totalPurchasesPerItemPerYear = await getTotalPurchasesPerItemPerYear();
//   console.log(totalPurchasesPerItemPerYear.length);
//   console.log("End !!!!");
// }

// test();
