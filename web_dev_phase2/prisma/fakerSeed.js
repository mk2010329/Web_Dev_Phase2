// This file is used to populate the json files according to the prisma schema,
// after this file is run, please run seed.js to populate the database using
// the generated data in the JSON file.

import fs from 'fs-extra'
import path from 'path'

import { faker } from "@faker-js/faker"

class fakerSeed {

    constructor() {
        this.itemsPath = path.join('app/data/items.json')
        this.usersPath = path.join('app/data/users.json')
        this.cartItemsPath = path.join('app/data/cartitems.json')
        this.currentlySellingPath = path.join('app/data/currentlysellingitems.json')
        this.itemSaleHistoryPath = path.join('app/data/itemsalehistory.json') 
        this.bankPath = path.join('app/data/bankaccount.json')
    }

    async run() {

        var itemsList = []
        var usersList = []
        var cartItemsList = []
        var currentlySellingList = []
        var bankList = []

        for (let index = 1; index <= 500; index++) {
            
            const user = {
                "username": index,
                "password": index,
                "name": faker.person.firstName(),
                "surname": faker.person.lastName(),
                "shippingAddress": faker.helpers.arrayElement(['Doha', 'Wakra', 'Al-Rayyan', 'Al-Khor', 'Al-Shamal'])
            }

            const item = {
                "itemId": index,
                "itemName": faker.helpers.arrayElement(['Laptop', 'Phone', 'Headphones', 'Desktop']),
                "price": parseFloat(faker.commerce.price({ min: 100, max: 2000 })),
                "quantity": 10,
                "selectedQuantity": null,
                "pictureUrl": faker.image.url(),
                "category": faker.helpers.arrayElement(['Electronics'])
            }

            const bankaccount = {
                "accountNumber": index,
                "username": index,
                "amount": 1000
            }

            const cartitems = {
                "username": index,
                "itemId": index
            }

            const currentsellingitems = {
                "username": faker.number.int({min: 360, max: 500}),
                "itemId": index
            }

            itemsList.push(item)
            usersList.push(user)
            cartItemsList.push(cartitems)
            currentlySellingList.push(currentsellingitems)
            bankList.push(bankaccount)

        }

        var itemSaleHistoryList = []

        for (let index = 1; index <= 100; index++) {

             const itemhistory = {
                "soldByUsername": index + 1,
                "boughtByUsername": index + 2,
                "itemId": index,
                "dateOfPurchase": faker.date.between({ from: '2019-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' })
            }
            itemSaleHistoryList.push(itemhistory)
        }
        // writing to the JSON files in @/app/data/
        await fs.writeJSON(this.bankPath, bankList)
        await fs.writeJSON(this.cartItemsPath, cartItemsList)
        await fs.writeJSON(this.currentlySellingPath, currentlySellingList)
        await fs.writeJSON(this.itemSaleHistoryPath, itemSaleHistoryList)
        await fs.writeJSON(this.itemsPath, itemsList)
        await fs.writeJSON(this.usersPath, usersList)

        console.log(itemsList)
        console.log(usersList)
        console.log("cartItemsList")
        console.log(cartItemsList)
        console.log("currentlySellingList")
        console.log(currentlySellingList)
        console.log(bankList)
        console.log(itemSaleHistoryList)

    }

    
}

const fakerseed = new fakerSeed()
fakerseed.run()