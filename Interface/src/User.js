import DataBase from "./DataBase";

class User {

    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.userAccounts = new Map();
        this.incomingTransfers = [];
        this.scheduledTransfers = [];
        this.outgoingTransfers = [];
    }

    signIn(id, password) {
        if (id == this.id && password == this.password) {
            return true;
        }
        return false;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUserAccounts() {
        return this.userAccounts;
    }

    // addAccount(account) {
    //     this.userAccounts.set(account.getAccountNumber(), account);
    // }

    addAccount(account) {
        console.log(`Adding account ${account.getAccountNumber()} to user ${this.id}`);
        this.userAccounts.set(account.getAccountNumber(), account);
        console.log(`User accounts after adding account:`, [...this.userAccounts]);
    }

    async removeAccount(accountNumber) {
        this.userAccounts.delete(accountNumber);
        await DataBase.storeUser(this.id, this);
    }


    toJSON() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            userAccounts: Array.from(this.userAccounts.entries()).map(([k, v]) => [k, v]),
        };
    }


    mapToJson(map) {
        return JSON.stringify([...map]);
    }

    jsonToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }

    getIncomingTransfers() {
        // Return incoming transfers
        return this.incomingTransfers;
    }

    getScheduledTransfers() {
        // Return scheduled transfers
        return this.scheduledTransfers;
    }

    getOutgoingTransfers() {
        // Return outgoing transfers
        return this.outgoingTransfers;
    }

    // Add methods to add transfers to the respective arrays:
    addIncomingTransfer(transfer) {
        this.incomingTransfers.push(transfer);
    }

    addScheduledTransfer(transfer) {
        this.scheduledTransfers.push(transfer);
    }

    addOutgoingTransfer(transfer) {
        this.outgoingTransfers.push(transfer);
    }

    getAccount(accountNumber) {
        return this.userAccounts.get(accountNumber);
    }

    performTransfer(fromAccountNumber, toAccountNumber, amount) {
        const fromAccount = this.getAccount(fromAccountNumber);
        const toAccount = this.getAccount(toAccountNumber);

        if (!fromAccount || !toAccount) {
            throw new Error("Invalid account number");
        }

        if (amount <= 0 || fromAccount.balance < amount) {
            throw new Error("Invalid amount");
        }

        fromAccount.balance -= amount;
        toAccount.balance += amount;
    }

    static fromJSON(json) {
        const user = Object.assign(new User(), json);
        user.userAccounts = new Map(json.userAccounts.map(([k, v]) => [k, Object.assign(new Account(), v)]));  // replace "Account" with your actual Account class
        return user;
    }
}
export default User;