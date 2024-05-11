import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'
let itemList = []

class ItemRepo{
    constructor() {
        this.filePath = path.join(process.cwd(), '/app/phase_1_data/items.json')
    }
    
     async  getItems(){ 
            const data = await fs.readJSON(this.filePath)
        return data
    }
    
    
     async storeItem(item){
        await fs.writeJSON(this.filePath, item)
        return 'ok'
    }
    
     async purchaseItem(item){
        
    }
    
 
}

export default new ItemRepo()


