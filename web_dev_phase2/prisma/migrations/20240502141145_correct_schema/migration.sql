/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `boughtByUser` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `Item` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - The primary key for the `BankAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountNo` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `username` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyName` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `itemId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureUrl` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNumber` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CartItem" (
    "username" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    PRIMARY KEY ("username", "itemId"),
    CONSTRAINT "CartItem_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurrentlySellingItem" (
    "username" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    PRIMARY KEY ("username", "itemId"),
    CONSTRAINT "CurrentlySellingItem_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CurrentlySellingItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemSaleHistory" (
    "soldByUsername" INTEGER NOT NULL,
    "boughtByUsername" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "dateOfPurchase" DATETIME NOT NULL,

    PRIMARY KEY ("soldByUsername", "boughtByUsername", "itemId"),
    CONSTRAINT "ItemSaleHistory_soldByUsername_fkey" FOREIGN KEY ("soldByUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemSaleHistory_boughtByUsername_fkey" FOREIGN KEY ("boughtByUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemSaleHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "itemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "selectedQuantity" INTEGER,
    "pictureUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Item" ("category", "price", "quantity", "selectedQuantity") SELECT "category", "price", "quantity", "selectedQuantity" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_BankAccount" (
    "accountNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "username" INTEGER NOT NULL,
    CONSTRAINT "BankAccount_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BankAccount" ("amount", "username") SELECT "amount", "username" FROM "BankAccount";
DROP TABLE "BankAccount";
ALTER TABLE "new_BankAccount" RENAME TO "BankAccount";
CREATE UNIQUE INDEX "BankAccount_username_key" ON "BankAccount"("username");
CREATE TABLE "new_User" (
    "username" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL
);
INSERT INTO "new_User" ("name", "password", "shippingAddress", "surname", "username") SELECT "name", "password", "shippingAddress", "surname", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
