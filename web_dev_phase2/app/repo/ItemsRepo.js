import path from 'path';
import fs from 'fs-extra';

let itemList = []

class ItemRepo{
    #itemsFilePath = path.join(process.cwd(), 'app/data/items.json');

    async getItems() {
        return await fs.readJSON(this.#itemsFilePath);
    }

    async getItem(name){
        if(!name || typeof name!=='string'){
            throw new Error("Invalid Item Name");
        }
        const Items = await this.getItems();
        return Items.filter((item)=>item.name.toLowerCase().includes(name.toLowerCase()));
    }

    async uploadItem(newItem){
    let items = JSON.parse(localStorage.getItem("itemList"));
    items.push(newItem);
    localStorage.setItem("itemList", JSON.stringify(items));
    return "Item add to items" ;
    }

     async storeItem(){

     }
        
    async purchaseItem(item){
            
    }
        
    async updateItem(item) {
        items.splice(items.findIndex(i => i.id == item.id), 1, item)
        localStorage.itemList = JSON.stringify(items)
    
        const loggedInUser = JSON.parse(localStorage.loggedInUser)
        loggedInUser.listOfCurrentItems
            .splice(loggedInUser.listOfCurrentItems.findIndex(i => i.id == item.id), 1, item)
        localStorage.loggedInUser = JSON.stringify(loggedInUser)
     }


}
export default new ItemRepo();
// export function uploadItem(newItem){
//     let items = JSON.parse(localStorage.getItem("itemList"));
//     items.push(newItem);
//     localStorage.setItem("itemList", JSON.stringify(items));
//     return "Item add to items" ;
// }
// const items = JSON.parse(await getItems())
// export function searchItem(id) {
//     return items.find(i => i.id == id)
// }


// export default async function getItems(){ 
//     // if (localStorage.itemList){
//     //     itemList = JSON.parse(localStorage.itemList)
//     // } else {
//         // const data = await fetch('app/data/items.json')
//         // itemList = await data.json()
//        // localStorage.itemList = JSON.stringify(itemList)
//    // }
//       return await {name: 'ali', id:213} ;
// }


// export function storeItem(){

// }

// export function purchaseItem(item){
    
// }

// export function updateItem(item) {
//     items.splice(items.findIndex(i => i.id == item.id), 1, item)
//     localStorage.itemList = JSON.stringify(items)

//     const loggedInUser = JSON.parse(localStorage.loggedInUser)
//     loggedInUser.listOfCurrentItems
//         .splice(loggedInUser.listOfCurrentItems.findIndex(i => i.id == item.id), 1, item)
//     localStorage.loggedInUser = JSON.stringify(loggedInUser)
// }