let itemList = []

export function uploadItem(newItem){
    let items = JSON.parse(localStorage.getItem("itemList"));
    items.push(newItem);
    localStorage.setItem("itemList", JSON.stringify(items));
    return "Item add to items" ;
}
const items = JSON.parse(await getItems())
export function searchItem(id) {
    return items.find(i => i.id == id)
}

export async function getItems(){ 
    if (localStorage.itemList){
        itemList = JSON.parse(localStorage.itemList)
    } else {
        const data = await fetch('/app/data/items.json')
        itemList = await data.json()
        localStorage.itemList = JSON.stringify(itemList)
    }
    return localStorage.itemList
}


export function storeItem(){

}

export function purchaseItem(item){
    
}

export function updateItem(item) {
    items.splice(items.findIndex(i => i.id == item.id), 1, item)
    localStorage.itemList = JSON.stringify(items)

    const loggedInUser = JSON.parse(localStorage.loggedInUser)
    loggedInUser.listOfCurrentItems
        .splice(loggedInUser.listOfCurrentItems.findIndex(i => i.id == item.id), 1, item)
    localStorage.loggedInUser = JSON.stringify(loggedInUser)
}