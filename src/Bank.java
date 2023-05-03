package src;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
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
    private static final String USERS_FILE_PATH = "src/users.txt";

    public Bank(String clearingNumber) {
        this.clearingNumber = clearingNumber;
        this.totalCapitalInBank = 0;
        this.liquidCash = 0;
        this.totalCapitalLoanedOut = 0;
        this.accounts = new HashMap<String, Account>();
        this.users = new HashMap<String, User>();
        loadUsersFromFile();
    }

    public void saveUsersToFile() {
        try {
            File file = new File(USERS_FILE_PATH);
            if (!file.exists()) {
                file.createNewFile();
            }
            PrintWriter writer = new PrintWriter(new FileWriter(file));
            for (User user : users.values()) {
                writer.println(user.getId() + "," + user.getName());
            }
            writer.close();
        } catch (IOException e) {
            System.out.println("Failed to save users to file.");
            e.printStackTrace();
        }
    }

    public void loadUsersFromFile() {
        try (BufferedReader reader = new BufferedReader(new FileReader(USERS_FILE_PATH))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                String id = fields[0];
                String name = fields[1];
                String password = fields[2];
                if (!users.containsKey(id)) {
                    createUser(id, name, password);
                }
            }
        } catch (IOException e) {
            System.out.println("Failed to load users from file.");
            e.printStackTrace();
        }
    }

    public User login(String userId, String password) {
        User user = getUser(userId);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } else {
            return null;
        }
    }

    public void createUser(String userId, String name, String password) {
        if (getUser(userId) != null) {
            System.out.println("Användarnamnet är redan taget. Försök igen med ett annat användarnamn.");
            return;
        }
        User newUser = new User(userId, name, password);
        this.users.put(userId, newUser);
        try {
            FileWriter writer = new FileWriter("src/users.txt", true);
            writer.write(userId + "," + name + "," + password + "\n");
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
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
