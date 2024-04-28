
export class Seller extends User {
    constructor(userName, password, bankAccount,listOfCurrentItems, listOfSoldItems){
        super(userName,password,bankAccount)
        this.listOfCurrentItems=listOfCurrentItems;
        this.listOfSoldItems=listOfSoldItems;

    }
    
}