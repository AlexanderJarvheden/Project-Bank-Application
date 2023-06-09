class Account {

    constructor(accountNumber, accountType, accountOwner
        // , interestRate
    ) {
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.accountOwner = accountOwner;
        this.balance = 50;
        // this.interestRate = interestRate;
        this.transactionHistory = [];

    }

    toJSON() {
        return {
            accountNumber: this.accountNumber,
            accountType: this.accountType,
            balance: this.balance,
            // Add other properties if necessary
        };
    }

    deposit(amount) {
        this.balance += amount;
        this.transactionHistory.push(`Deposit: ${amount}`);
    }

    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push(`Withdraw: ${amount}`);
            return true;
        }
        return false;
    }

    transfer(destination, amount) {
        if (this.withdraw(amount)) {
            destination.deposit(amount);
            this.transactionHistory.push(`Transfer to ${destination.getAccountNumber()}: ${amount}`);
            return true;
        }
        return false;
    }

    getBalance() {
        return this.balance;
    }

    getTransactionHistory() {
        return this.transactionHistory;
    }

    calculateInterest() {
        return this.balance * this.interestRate;
    }

    getAccountNumber() {
        return this.accountNumber;
    }
}

export default Account;