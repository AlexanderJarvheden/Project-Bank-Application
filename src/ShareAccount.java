
/**
 * ShareAccount class used for buying and selling shares through the stock
 * market platform.
 */

public class ShareAccount extends Account {

    private int numShares;
    private double sharePrice;

    public ShareAccount(String accountNumber, double interestRate, int numShares, double sharePrice,
            User accountOwner) {
        super(accountNumber, "Share Account", accountOwner, interestRate);
        this.numShares = numShares;
        this.sharePrice = sharePrice;
    }

    public double calculateInterest() {
        double interest = getBalance() * getInterestRate();
        deposit(interest);
        return interest;
    }

    public void buyShares(int numShares) {
        double purchasePrice = numShares * sharePrice;
        if (withdraw(purchasePrice)) {
            this.numShares += numShares;
            System.out.println(numShares + " shares purchased for " + purchasePrice + " from Share Account "
                    + getAccountNumber() + ".");
        } else {
            System.out.println("Insufficient funds.");
        }
    }

    public void sellShares(int numShares) {
        if (this.numShares >= numShares) {
            double salePrice = numShares * sharePrice;
            deposit(salePrice);
            this.numShares -= numShares;
            System.out.println(
                    numShares + " shares sold for " + salePrice + " from Share Account " + getAccountNumber() + ".");
        } else {
            System.out.println("Insufficient shares.");
        }
    }

    public String getAccountInfo() {
        return "Share Account," + getAccountNumber() + "," + getAccountOwner().getId() + "," + getInterestRate() + ","
                + getNumShares() + "," + getSharePrice();
    }

}
