
public class LoanAccount extends Account {

    private double interestRate;

    public LoanAccount(String accountNumber, double interestRate, User accountOwner) {
        super(accountNumber, "Loan Account", accountOwner, 0);
        this.interestRate = interestRate;
    }

    public void makePayment(double amount) {
        deposit(amount);
        System.out.println("Payment of " + amount + " made to Loan Account " + getAccountNumber() + ".");
    }

    public double calculateInterest() {
        return getBalance() * interestRate;
    }
}
