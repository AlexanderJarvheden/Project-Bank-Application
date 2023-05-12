class LoanAccount extends Account {
    constructor(accountNumber, user, principal, interestRate) {
        super(accountNumber, "Loan Account", user);
        this.principal = principal;
        this.interestRate = interestRate;
        this.balance = principal; // initialize balance as the borrowed principal
    }

    getPrincipal() {
        return this.principal;
    }

    getInterestRate() {
        return this.interestRate;
    }

    // Override the withdraw method to disallow withdrawals from a loan account
    withdraw(amount) {
        throw new Error("Cannot withdraw from a loan account.");
    }

    // Method to repay the loan
    repay(amount) {
        if (amount > this.balance) {
            throw new Error("Cannot repay more than the remaining loan balance.");
        }
        this.balance -= amount;
        this.bank.removeCapitalLoanedOut(amount); // update bank's totalCapitalLoanedOut
    }
}