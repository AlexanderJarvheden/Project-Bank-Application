package src;

import java.util.ArrayList;
import java.util.List;

/**
 * Account class
 * 
 * This class represents a bank accounts within the bank.
 * 
 * @author Joachim Olsson
 * @author Alexander Järvheden
 * @author Aziz Ali
 * @version 2023-04-26
 * 
 */

public class Account {

    private String accountNumber;
    private String accountType;
    private String accountOwner;
    private double balance;
    private double interestRate;
    private List<String> transactionHistory;

    public Account(String accountNumber, String accountType, String accountOwner, double interestRate) {
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.accountOwner = accountOwner;
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
