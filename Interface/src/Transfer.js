class Transfer {
    constructor(fromAccount, toAccount, amount, date) {
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
        this.date = date;
    }

    getFromAccount() {
        return this.fromAccount;
    }

    getToAccount() {
        return this.toAccount;
    }

    getAmount() {
        return this.amount;
    }

    getDate() {
        return this.date;
    }
}

export default Transfer;
