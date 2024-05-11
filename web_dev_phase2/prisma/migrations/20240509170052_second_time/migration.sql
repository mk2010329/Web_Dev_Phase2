-- CreateTable
CREATE TABLE "User" (
    "username" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "itemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "selectedQuantity" INTEGER,
    "pictureUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

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

-- CreateTable
CREATE TABLE "BankAccount" (
    "accountNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "username" INTEGER NOT NULL,
    CONSTRAINT "BankAccount_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_username_key" ON "BankAccount"("username");
