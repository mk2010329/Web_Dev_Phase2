import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'
let itemList = []

class ItemRepo{
    constructor() {
        this.filePath = path.join(process.cwd(), '/app/phase_1_data/items.json')
    }
    //  async uploadItem(newItem){
    //     let items = JSON.parse(localStorage.getItem("itemList"));
    //     items.push(newItem);
    //     localStorage.setItem("itemList", JSON.stringify(items));
    //     return "Item add to items" ;
    // }
    // const items = JSON.parse(await getItems())
    //  async searchItem(id) {
    //     return items.find(i => i.id == id)
    // }
    
     async  getItems(){ 
        // if (localStorage.itemList){
        //     itemList = JSON.parse(localStorage.itemList)
        // } else {
            const data = await fs.readJSON(this.filePath)
          //  itemList = await data.json()
        //     localStorage.itemList = JSON.stringify(itemList)
        // }
        return data
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

export default new ItemRepo()


