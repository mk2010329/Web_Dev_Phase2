export class bankAccount {
    constructor(amount, saleHistory) {
        this.amount = amount;
        this.saleHistory = saleHistory;
    }

    creditAmount(amount) {
        this.amount += amount
    }
    debitAmount(amount) {
        this.amount -= amount
    }
}