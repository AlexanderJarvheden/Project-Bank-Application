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


    async addAccount(account) {
        console.log(`Adding account ${account.getAccountNumber()} to user ${this.id}`);
        this.userAccounts.set(account.getAccountNumber(), account);
        console.log(`User accounts after adding account:`, [...this.userAccounts]);

        // Save changes to the storage
        await Database.storeUser(this.id, this);
    }

    async removeAccount(accountNumber) {
        this.userAccounts.delete(accountNumber);

        // Save changes to the storage
        await Database.storeUser(this.id, this);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            userAccounts: Array.from(this.userAccounts.entries()).map(([k, v]) => [k, v.toJSON()]),
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
}

export default User;