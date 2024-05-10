"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Done (it work)
export async function getAllItems() {
  try {
    const items = await prisma.item.groupBy({
      by: ["itemName"],
      _count: { itemName: true }
    });
    return items;
  } catch (error) {
    throw new Error(`Unable to fetch items: ${error}`);
  }
}
//Done (it work)
export async function getTotalSalesCount() {
  try {
    const count = await prisma.itemSaleHistory.count();
    return count;
  } catch (error) {
    throw new Error(`Unable to fetch total sales count: ${error}`);
  }
}

// Q1 :Total amount of purchases per item and per year (work)
export async function getPurchasesPerProductPerYear() {
  const purchaseData = await prisma.itemSaleHistory.findMany({
    select: {
      item: {
        select: {
          itemName: true,
          price: true,
        },
      },
      dateOfPurchase: true,
    },
    orderBy: {
      dateOfPurchase: "desc",
    },
  });

  const result = purchaseData.reduce((acc, curr) => {
    const year = curr.dateOfPurchase.getFullYear();
    const itemName = curr.item.itemName;
    const price = curr.item.price;

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][itemName]) {
      acc[year][itemName] = { totalAmount: 0, itemName };
    }

    acc[year][itemName].totalAmount += price;

    return acc;
  }, {});

  return result;
}

// Q2 : The most 3 items bought over the last 6 months (It work)
export async function getMostBoughtProductsLastSixMonths() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const mostBoughtProducts = await prisma.itemSaleHistory.findMany({
    where: {
      dateOfPurchase: {
        gte: sixMonthsAgo,
      },
    },
    select: {
      item: {
        select: {
          itemName: true,
        },
      },
    },
  });

  const result = Object.values(
    mostBoughtProducts.reduce((acc, curr) => {
      const itemName = curr.item.itemName;

      if (!acc[itemName]) {
        acc[itemName] = { count: 0, itemName };
      }

      acc[itemName].count++;

      return acc;
    }, {})
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return result;
}

// Q3 : The categories never purchased
export async function getItemNeverPurchasedTypes() {
  const neverPurchasedTypes = await prisma.item.findMany({
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

  return neverPurchasedTypes;
}

// Q4 : The total number of items in our website (It work)
export async function getTotalItems() {
  try {
    const count = await prisma.item.count();
    return count;
  } catch (error) {
    throw new Error(`Unable to fetch total items: ${error}`);
  }
}

// Q5 : The average of item price in our website (It work)
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

// Q6 : it get purchases per month (It work ) but some logic error
export async function getPurchasesPerMonth() {
  const purchaseData = await prisma.itemSaleHistory.findMany({
    select: {
      item: {
        select: {
          itemName: true,
          price: true,
        },
      },
      dateOfPurchase: true,
    },
    orderBy: {
      dateOfPurchase: "desc",
    },
  });

  const result = purchaseData.reduce((acc, curr) => {
    const month = curr.dateOfPurchase.getMonth() + 1; // Months are zero-indexed
    const year = curr.dateOfPurchase.getFullYear();
    const itemName = curr.item.itemName;
    const price = curr.item.price;

    const monthYear = `${month}/${year}`; // Combine month and year into a single key

    if (!acc[monthYear]) {
      acc[monthYear] = { totalAmount: 0 };
    }

    acc[monthYear].totalAmount += price;

    return acc;
  }, {});

  return result;
}