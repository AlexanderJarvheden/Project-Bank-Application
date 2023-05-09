class User {

    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.userAccounts = new Map();
        this.loans = new Map();
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

    addAccount(account) {
        this.userAccounts.set(account.getAccountNumber(), account);
    }

    removeAccount(accountNumber) {
        this.userAccounts.delete(accountNumber);
    }

    // Add the following methods to the User class
    addLoan(loan) {
        this.loans.set(loan.id, loan);
    }

    removeLoan(loanId) {
        this.loans.delete(loanId);
    }

    getLoans() {
        return this.loans;
    }

    makeLoanPayment(loanId, paymentAmount) {
        const loan = this.loans.get(loanId);
        if (loan) {
            return loan.makePayment(paymentAmount);
        }
        return 'Loan not found';
    }
}

export default User;