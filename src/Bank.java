package src;

import java.util.HashMap;
import java.util.Map;

/**
 * Bank class
 * 
 * @author Joachim Olsson
 * @author Alexander Järvheden
 * @author Aziz Ali
 * @version 2023-04-26
 * 
 */

public class Bank {

    private String clearingNumber;
    private double totalCapitalInBank;
    private double liquidCash;
    private double totalCapitalLoanedOut;
    private Map<String, Account> accounts;
    private Map<String, User> users;
    private int accountNumberCounter = 0;

    public Bank(String clearingNumber) {
        this.clearingNumber = clearingNumber;
        this.totalCapitalInBank = 0;
        this.liquidCash = 0;
        this.totalCapitalLoanedOut = 0;
        this.accounts = new HashMap<String, Account>();
        this.users = new HashMap<String, User>();
    }

    public User createUser(String id, String name) {
        User newUser = new User(id, name);
        users.put(id, newUser);
        return newUser;
    }

    public User getUser(String id) {
        return users.get(id);
    }

    public Account createAccount(String accountType, User user, double interestRate) {
        String accountNumber = generateUniqueAccountNumber();
        Account newAccount = new Account(accountNumber, accountType, user, interestRate);
        accounts.put(accountNumber, newAccount);
        user.addAccount(newAccount);
        return newAccount;
    }

    public Account getAccount(String accountNumber) {
        return accounts.get(accountNumber);
    }

    private String generateUniqueAccountNumber() {
        int uniqueNumber = accountNumberCounter;
        accountNumberCounter++;
        return String.format("%010d", uniqueNumber);
    }

    public String getClearingNumber() {
        return this.clearingNumber;
    }

    public double getTotalCapitalInBank() {
        return this.totalCapitalInBank;
    }

    public double getLiquidCash() {
        return this.liquidCash;
    }

    public double getTotalCapitalLoanedOut() {
        return this.totalCapitalLoanedOut;
    }

    public Map<String, Account> getAccounts() {
        return this.accounts;
    }

    public void setClearingNumber(String clearingNumber) {
        this.clearingNumber = clearingNumber;
    }

    public void setTotalCapitalInBank(double totalCapitalInBank) {
        this.totalCapitalInBank = totalCapitalInBank;
    }

    public void setLiquidCash(double liquidCash) {
        this.liquidCash = liquidCash;
    }

    public void setTotalCapitalLoanedOut(double totalCapitalLoanedOut) {
        this.totalCapitalLoanedOut = totalCapitalLoanedOut;
    }

    public void removeAccount(String accountNumber) {
        this.accounts.remove(accountNumber);
    }

    public void addCapital(double amount) {
        this.totalCapitalInBank += amount;
    }

    public void removeCapital(double amount) {
        this.totalCapitalInBank -= amount;
    }

    public void addLiquidCash(double amount) {
        this.liquidCash += amount;
    }

    public void removeLiquidCash(double amount) {
        this.liquidCash -= amount;
    }

    public void addCapitalLoanedOut(double amount) {
        this.totalCapitalLoanedOut += amount;
    }

    public void removeCapitalLoanedOut(double amount) {
        this.totalCapitalLoanedOut -= amount;
    }

}
