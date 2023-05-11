class LoanPlatform {
    constructor() {
        this.loans = new Map();
    }

    createLoan(user, amount, interestRate, termMonths, startDate) {
        const loanId = this.generateLoanId();
        const newLoan = {
            id: loanId,
            user: user,
            principal: amount,
            interestRate: interestRate,
            termMonths: termMonths,
            startDate: startDate,
            remainingBalance: amount,
            paymentHistory: [],
        };
        newLoan.installmentAmount = this.calculateInstallmentAmount(newLoan);
        this.loans.set(loanId, newLoan);
        user.addLoan(newLoan);
        return newLoan;
    }

    calculateInstallmentAmount(loan) {
        const ratePerMonth = loan.interestRate / 1200;
        const numerator = ratePerMonth * Math.pow(1 + ratePerMonth, loan.termMonths);
        const denominator = Math.pow(1 + ratePerMonth, loan.termMonths) - 1;
        return loan.principal * (numerator / denominator);
    }

    makePayment(loanId, paymentAmount) {
        const loan = this.loans.get(loanId);
        if (loan) {
            const remainingInterest = loan.remainingBalance * loan.interestRate / 1200;
            const principalPaid = paymentAmount - remainingInterest;
            loan.remainingBalance -= principalPaid;
            loan.paymentHistory.push({
                date: new Date(),
                paymentAmount,
                principalPaid,
                remainingInterest,
                remainingBalance: loan.remainingBalance,
            });

            if (loan.remainingBalance <= 0) {
                loan.remainingBalance = 0;
                return 'Loan fully repaid';
            }
            return `Remaining balance: ${loan.remainingBalance.toFixed(2)}`;
        }
        return null;
    }

    getRemainingBalance(loanId) {
        const loan = this.loans.get(loanId);
        return loan ? loan.remainingBalance : null;
    }

    generateLoanId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

export default LoanPlatform;

