
public class LoanAccount extends Account {

    public LoanAccount(String accountNumber, double interestRate, User accountOwner) {
        super(accountNumber, "Loan Account", accountOwner, 0);
    }

    public void makePayment(double amount) {
        deposit(amount);
        System.out.println("Payment of " + amount + " made to Loan Account " + getAccountNumber() + ".");
    }

    public String getAccountInfo() {
        return "Loan Account," + getAccountNumber() + "," + getAccountOwner().getId() + "," + getInterestRate();
    }

}
