class User {

    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.userAccounts = new Map();
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
        this.userAccounts.set(account.getAccountNumber(), account.toJSON());
        console.log(`User accounts after adding account:`, [...this.userAccounts]);
    }

    removeAccount(accountNumber) {
        this.userAccounts.delete(accountNumber);
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

}



export default User;