class Bank {

    constructor(clearingNumber) {
        this.clearingNumber = clearingNumber;
        this.totalCapitalInBank = 0;
        this.liquidCash = 0;
        this.totalCapitalLoanedOut = 0;
        this.accounts = new Map();
        this.accountNumberCounter = 0;
    }

    getAccount(accountNumber) {
        return this.accounts.get(accountNumber);
    }

    createAccount(accountType, user, interestRate) {
        let accountNumber = this.generateUniqueAccountNumber();
        let newAccount = new Account(accountNumber, accountType, user, interestRate);
        this.accounts.set(accountNumber, newAccount);
        user.addAccount(newAccount);
        return newAccount;
    }

    generateUniqueAccountNumber() {
        let uniqueNumber = this.accountNumberCounter;
        this.accountNumberCounter++;
        return uniqueNumber.toString().padStart(10, '0');
    }

    getClearingNumber() {
        return this.clearingNumber;
    }

    getTotalCapitalInBank() {
        return this.totalCapitalInBank;
    }

    getLiquidCash() {
        return this.liquidCash;
    }

    getTotalCapitalLoanedOut() {
        return this.totalCapitalLoanedOut;
    }

    getAccounts() {
        return this.accounts;
    }

    setClearingNumber(clearingNumber) {
        this.clearingNumber = clearingNumber;
    }

    setTotalCapitalInBank(totalCapitalInBank) {
        this.totalCapitalInBank = totalCapitalInBank;
    }

    setLiquidCash(liquidCash) {
        this.liquidCash = liquidCash;
    }

    setTotalCapitalLoanedOut(totalCapitalLoanedOut) {
        this.totalCapitalLoanedOut = totalCapitalLoanedOut;
    }

    addAccount(accountType, user, interestRate) {
        let newAccount = this.createAccount(accountType, user, interestRate);
        let accountNumber = newAccount.getAccountNumber();
        this.accounts.set(accountNumber, newAccount);
        user.addAccount(newAccount);
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
}
