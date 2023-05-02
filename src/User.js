class User {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.userAccounts = new Map();
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

    addAccount(account) {
        this.userAccounts.set(account.getAccountNumber(), account);
    }

    removeAccount(accountNumber) {
        this.userAccounts.delete(accountNumber);
    }
}