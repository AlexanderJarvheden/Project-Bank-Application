package src;

public class CardAccount extends Account {

    private int cardNumber;
    private int cardVerificationCode;

    public CardAccount(String accountNumber, double interestRate, int cardNumber, int cardVerificationCode) {
        super(accountNumber, interestRate);
        this.cardNumber = cardNumber;
        this.cardVerificationCode = cardVerificationCode;
    }

    public void makePayment(double amount) {
        // Define method to make payment from CardAccount
    }
}