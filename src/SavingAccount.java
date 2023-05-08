
public class SavingAccount extends Account {

    public SavingAccount(String accountNumber, double interestRate, User accountOwner) {
        super(accountNumber, "Saving Account", accountOwner, interestRate);
    }

    public String getAccountInfo() {
        return "Saving Account," + getAccountNumber() + "," + getAccountOwner().getId() + "," + getInterestRate() + ","
                + getBalance();
    }

}
