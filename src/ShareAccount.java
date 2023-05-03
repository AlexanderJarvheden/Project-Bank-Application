
public class ShareAccount extends Account {
    private double sharePrice;

    public ShareAccount(String accountNumber, double interestRate, double sharePrice) {
        super(accountNumber, interestRate);
        this.sharePrice = sharePrice;
    }

    public void buyShares(int amount) {
        // Define method to buy shares from ShareAccount
    }

    public void sellShares(int amount) {
        // Define method to sell shares from ShareAccount
    }
}