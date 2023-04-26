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

    public Bank(String clearingNumber) {
        this.clearingNumber = clearingNumber;
        this.totalCapitalInBank = 0;
        this.liquidCash = 0;
        this.totalCapitalLoanedOut = 0;
        this.accounts = new HashMap<String, Account>();
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

    public void addAccount(String accountNumber, Account account) {
        this.accounts.put(accountNumber, account);
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
