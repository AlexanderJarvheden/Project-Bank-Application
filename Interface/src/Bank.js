import User from "../src/User";
import Account from "./Account";

class Bank {
    constructor(clearingNumber) {
        this.clearingNumber = clearingNumber;
        this.totalCapitalInBank = 0;
        this.liquidCash = 0;
        this.totalCapitalLoanedOut = 0;
        this.accounts = new Map();
        this.users = new Map();
        this.accountNumberCounter = 0;

        let patientZero = new User("021101", "Alexander Järvheden", "123");
        this.users.set(patientZero.getId(), patientZero)

        this.accountTypes = new Map();
        this.accountTypes.set("Savings account", 0.75);
        this.accountTypes.set("Checkings account", '');
        this.accountTypes.set("Credit card", '');
    }

    newUser(personalNumber, password, name) {
        newUser = new User(personalNumber, name, password);
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

    createAccount(accountType, user) {
        const accountNumber = this.generateUniqueAccountNumber();
        const newAccount = new Account(accountNumber, accountType, user);
        console.log("newAccount:", newAccount); // Check if newAccount object is created as expected
    
        this.accounts.set(accountNumber, newAccount);
        console.log("user:", user); // Check if user object is defined and has expected value
        user.addAccount(newAccount); // Check if user object has the addAccount method and is callable
        return newAccount;
    }
    

    getAccount(accountNumber) {
        return this.accounts.get(accountNumber);
    }

    generateUniqueAccountNumber() {
        const uniqueNumber = this.accountNumberCounter;
        this.accountNumberCounter++;
        return uniqueNumber.toString().padStart(10, '0');
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