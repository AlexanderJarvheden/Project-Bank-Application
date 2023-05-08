
public class CardAccount extends Account {

    private String cardAccountNumber;

    public CardAccount(String accountNumber, double interestRate, String cardAccountNumber, User accountOwner) {
        super(accountNumber, "Card Account", accountOwner, interestRate);
        this.cardAccountNumber = cardAccountNumber;
    }

    public String getCardAccountNumber() {
        return cardAccountNumber;
    }

    public void makePayment(double amount) {
        if (withdraw(amount)) {
            System.out.println("Payment of " + amount + " made from Card Account " + getAccountNumber() + ".");
        } else {
            System.out.println("Insufficient funds.");
        }
    }

    public String getAccountInfo() {
        return "Card Account," + getAccountNumber() + "," + getAccountOwner().getId() + "," + getInterestRate() + ","
                + getCardAccountNumber();
    }

}
