
public class SavingAccount extends Account {

    private double interestRate;

    public SavingAccount(String accountNumber, double interestRate, User accountOwner) {
        super(accountNumber, "Saving Account", accountOwner, interestRate);
        this.interestRate = interestRate;
    }

    public double calculateInterest() {
        double interest = getBalance() * interestRate;
        deposit(interest);
        return interest;
    }
}
