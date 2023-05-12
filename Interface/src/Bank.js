import User from "../src/User";
import Account from "./Account";
import DataBase from "./DataBase";

class Bank {
    constructor(clearingNumber) {
        this.clearingNumber = clearingNumber;
        this.totalCapitalInBank = 0;
        this.liquidCash = 0;
        this.totalCapitalLoanedOut = 0;
        this.accounts = new Map();
        this.users = new Map();
        this.initAccountNumberCounter();
        this.accountTypes = new Map();
        this.accountTypes.set("Savings account", 0.75);
        this.accountTypes.set("Checkings account", '');
        this.accountTypes.set("Credit card", '');
    }

    async initAccountNumberCounter() {
        const counter = await DataBase.getAccountNumberCounter("ceriseBank");
        if (counter === null) {
            DataBase.storeAccountNumberCounter("ceriseBank", 1);
        }
    }


    newUser(personalNumber, password, name) {
        const newUser = new User(personalNumber, name, password);
        this.users.set(personalNumber, newUser);
        return newUser;
    }

    getAllUsers() {
        return Array.from(this.users.values());
    }

    getAllUsers() {
        return Array.from(this.users.values());
    }


    login(userId, password) {
        const user = this.getUser(userId);
        if (user !== undefined && user.getPassword() === password) {
            return user;
        } else {
            return null;
        }
    }

    createUser(userId, name, password) {
        const newUser = new User(userId, name, password);
        this.users.set(userId, newUser);
    }

    getUser(id) {
        return this.users.get(id);
    }

    // createAccount(accountType, user) {
    //     const accountNumber = this.generateUniqueAccountNumber();
    //     const newAccount = new Account(accountNumber, accountType, user);
    // /*
    // createAccount(accountType, user, interestRate) {
    //     const accountNumber = this.generateUniqueAccountNumber();
    //     const newAccount = new Account(accountNumber, accountType, user, interestRate);
    // */
    //     this.accounts.set(accountNumber, newAccount);
    //     user.addAccount(newAccount);
    //     return newAccount;
    // }

    async createAccount(accountType, user) {
        const accountNumber = await this.generateUniqueAccountNumber();
        const newAccount = new Account(accountNumber, accountType, user);

        this.accounts.set(accountNumber, newAccount);
        user.addAccount(newAccount);

        await DataBase.storeUser(user.getId(), user); // Add 'await' here

        return newAccount;
    }


    getAccount(accountNumber) {
        return this.accounts.get(accountNumber);
    }

    async generateUniqueAccountNumber() {
        let accountNumberCounter = await DataBase.getAccountNumberCounter("ceriseBank");
        console.log(accountNumberCounter);
        accountNumberCounter++;
        await DataBase.storeAccountNumberCounter("ceriseBank", accountNumberCounter); // Add 'await' here
        return accountNumberCounter.toString().padStart(10, '0');
    }

    removeAccount(accountNumber) {
        this.accounts.delete(accountNumber);
    }

    addCapital(amount) {
        this.totalCapitalInBank += amount;
    }

    removeCapital(amount) {
        this.totalCapitalInBank -= amount;
    }

    addLiquidCash(amount) {
        this.liquidCash += amount;
    }

    removeLiquidCash(amount) {
        this.liquidCash -= amount;
    }

    addCapitalLoanedOut(amount) {
        this.totalCapitalLoanedOut += amount;
    }

    removeCapitalLoanedOut(amount) {
        this.totalCapitalLoanedOut -= amount;
    }

    getClearingNumber() {
        return this.clearingNumber;
    }
}
export default Bank;