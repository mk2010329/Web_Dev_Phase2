export class Customer extends User {
    constructor(username, password, bankAccount, name, surname, shippingAddress, moneyBalance, listOfPurchasedItems, address) {
        super(username, password, bankAccount);
        this.name = name;
        this.surname = surname;
        this.shippingAddress = shippingAddress;
        this.moneyBalance = moneyBalance;
        this.listOfPurchasedItems = listOfPurchasedItems;
        this.address = address;
    }
}