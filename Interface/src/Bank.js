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
        this.transfers = new Map();

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

    async createAccount(accountType, user) {
        const accountNumber = await this.generateUniqueAccountNumber(); // Add 'await' here
        const newAccount = new Account(accountNumber, accountType, user);
        console.log("newAccount:", newAccount); // Check if newAccount object is created as expected

        this.accounts.set(accountNumber, newAccount);
        console.log("user:", user.getUserAccounts()); // Check if user object is defined and has expected value
        user.addAccount(newAccount); // Check if user object has the addAccount method and is callable

        // Store the updated user data in the database
        DataBase.storeUser(user.getId(), user);

        return newAccount;
    }

    validateTransfer(fromAccountNumber, toAccountNumber, amount) {
        const fromAccount = this.getAccount(fromAccountNumber);
        const toAccount = this.getAccount(toAccountNumber);


        if (!fromAccount || !toAccount) {
            return { success: false, message: 'Invalid account numbers.' };
        }

        const fromAccountBalance = fromAccount.getBalance();
        if (fromAccountBalance < amount) {
            return { success: false, message: 'Insufficient funds.' };
        }

        return { success: true, message: 'Transfer is valid.' };
    }


    performTransfer(fromAccountNumber, toAccountNumber, amount) {
        const validationResult = this.validateTransfer(fromAccountNumber, toAccountNumber, amount);

        if (!validationResult.success) {
            Alert.alert('Error', validationResult.message);
            return;
        }

        const fromAccount = this.getAccount(fromAccountNumber);
        const toAccount = this.getAccount(toAccountNumber);

        // Deduct the amount from the 'fromAccount'
        fromAccount.withdraw(amount);

        // Schedule the transfer if outside the 13:00 - 17:00 window
        const now = new Date();
        const hours = now.getHours();
        if (hours < 13 || hours > 17) {
            const scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0, 0);
            scheduledDate.setDate(scheduledDate.getDate() + (scheduledDate.getDay() === 5 ? 3 : 1));
            const transfer = this.createTransfer(fromAccount, toAccount, amount, scheduledDate);
            fromAccount.userPersonalNumber.getScheduledTransfers().push(transfer);
        } else {
            // Add the amount to the 'toAccount' and store the transfer
            toAccount.deposit(amount);
            const transfer = this.createTransfer(fromAccount, toAccount, amount, new Date());
            fromAccount.userPersonalNumber.getIncomingTransfers().push(transfer);
        }
    }


    createTransfer(fromAccount, toAccount, amount, date) {
        const transfer = new Transfer(fromAccount, toAccount, amount, date);
        const transferKey = `${fromAccount}_${toAccount}_${Date.now()}`;
        this.transfers.set(transferKey, transfer);
        return transfer;
    }

    getAccount(accountNumber) {
        return this.accounts.get(accountNumber);
    }

    async generateUniqueAccountNumber() {
        let accountNumberCounter = await DataBase.getAccountNumberCounter("ceriseBank");
        console.log(accountNumberCounter);
        accountNumberCounter++;
        await DataBase.storeAccountNumberCounter("ceriseBank", accountNumberCounter); // Add 'await' here
        return accountNumberCounter.toString().padStart(5, '0');
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

    // Add the following methods to the Bank class
    createLoanPlatform(account, principal, interestRate, termMonths, startDate) {
        const loanPlatformId = this.generateUniqueLoanPlatformId();
        const newLoanPlatform = new LoanPlatform(loanPlatformId, account, principal, interestRate, termMonths, startDate);
        this.loanPlatforms.set(loanPlatformId, newLoanPlatform);
        return newLoanPlatform;
    }

    getLoanPlatform(loanPlatformId) {
        return this.loanPlatforms.get(loanPlatformId);
    }

    getAllLoanPlatforms() {
        return Array.from(this.loanPlatforms.values());
    }

    generateUniqueLoanPlatformId() {
        const uniqueId = this.loanPlatformIdCounter;
        this.loanPlatformIdCounter++;
        return uniqueId.toString().padStart(10, '0');
    }
}
export default Bank;