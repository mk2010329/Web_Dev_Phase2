import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const itemsPath = path.join(process.cwd(), 'app/data/items.json')
const usersPath = path.join(process.cwd(), 'app/data/users.json')
const cartItemsPath = path.join(process.cwd(), 'app/data/cartitems.json')
const currentlySellingPath = path.join(process.cwd(), 'app/data/currentlysellingitems.json')
const itemSaleHistoryPath = path.join(process.cwd(), 'app/data/itemsalehistory.json') 
const bankPath = path.join(process.cwd(), 'app/data/bankaccount.json')

async function main() {
    try {
        const items = await fs.readJSON(itemsPath)
        const users = await fs.readJSON(usersPath)
        const cartItems = await fs.readJSON(cartItemsPath)
        const currentlySellingItems = await fs.readJSON(currentlySellingPath)
        const itemSaleHistory = await fs.readJSON(itemSaleHistoryPath)
        const bankAccounts = await fs.readJSON(bankPath)

        // Delete all existing entries in the database
        // await prisma.user.deleteMany({})
        // await prisma.item.deleteMany({})
        // await prisma.cartItem.deleteMany({})
        // await prisma.currentlySellingItem.deleteMany({})
        // await prisma.itemSaleHistory.deleteMany({})
        // await prisma.bankAccount.deleteMany({})

        // populating the database
        for (const user of users) await prisma.user.create({ data: user })
        for (const item of items) await prisma.item.create({ data: item })
        for (const item of cartItems) await prisma.cartItem.create({ data: item })
        for (const item of currentlySellingItems) await prisma.currentlySellingItem.create({ data: item })
        for (const item of itemSaleHistory) await prisma.itemSaleHistory.create({ data: item })
        for (const acc of bankAccounts) await prisma.bankAccount.create({data: acc})

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })