package src;

import java.util.ArrayList;
import java.util.List;

/**
 * Account class
 * 
 * This class represents a bank accounts within the bank. They contain
 * information about the accounts
 * balance, interest rate, transaction history and account number. Each account
 * is connected to a user
 * and can be accessed through the user class.
 * 
 * @author Joachim Olsson
 * @author Alexander Järvheden
 * @author Aziz Ali
 * @version 2023-04-26
 * 
 */

public abstract class Account {

    private String accountNumber;
    private double balance;
    private double interestRate;
    private List<String> transactionHistory;

    public Account(String accountNumber, double interestRate) {
        this.accountNumber = accountNumber;
        this.interestRate = interestRate;
        this.transactionHistory = new ArrayList<>();
        this.balance = 0;
    }

    public void deposit(double amount) {
        this.balance += amount;
        transactionHistory.add("Deposit: " + amount);
    }

    public boolean withdraw(double amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            transactionHistory.add("Withdraw: " + amount);
            return true;
        }
        return false;
    }

    public boolean transfer(Account destination, double amount) {
        if (withdraw(amount)) {
            destination.deposit(amount);
            transactionHistory.add("Transfer to " + destination.getAccountNumber() + ": " + amount);
            return true;
        }
        return false;
    }

    public double getBalance() {
        return this.balance;
    }

    public List<String> getTransactionHistory() {
        return this.transactionHistory;
    }

    public double calculateInterest() {
        return this.balance * this.interestRate;
    }

    public String getAccountNumber() {
        return accountNumber;
    }
}