
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

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
    private Map<String, Account> accounts;
    private Map<String, User> users;
    private int accountNumberCounter = 0;
    private int cardAccountNumberCounter = 0;
    private final String USERS_FILE = "src/users.txt";
    private final String ACCOUNTS_FILE = "src/accounts.txt";

    public Bank(String clearingNumber) {
        this.accounts = new HashMap<>();
        this.users = new HashMap<>();
        this.clearingNumber = clearingNumber;
        loadUsersFromFile();
    }

    public void saveUsersToFile() {
        try {
            File file = new File(USERS_FILE);
            if (!file.exists()) {
                file.createNewFile();
            }
            PrintWriter writer = new PrintWriter(new FileWriter(file));
            for (User user : users.values()) {
                StringBuilder accountNumbers = new StringBuilder();
                for (Account account : user.getAccounts()) {
                    accountNumbers.append(account.getAccountNumber()).append(",");
                }
                if (accountNumbers.length() > 0) {
                    accountNumbers.deleteCharAt(accountNumbers.length() - 1);
                }
                writer.println(user.getId() + "," + user.getName() + "," + user.getPassword() + ","
                        + accountNumbers.toString());
            }
            writer.close();
        } catch (IOException e) {
            System.out.println("Failed to save users to file.");
            e.printStackTrace();
        }
    }

    public void loadUsersFromFile() {
        try (BufferedReader reader = new BufferedReader(new FileReader(USERS_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] fields = line.split(",");
                String id = fields[0];
                String name = fields[1];
                String password = fields[2];
                User user = new User(id, name, password);
                if (fields.length > 3) {
                    String[] accountNumbers = fields[3].split(",");
                    for (String accountNumber : accountNumbers) {
                        Account account = accounts.get(accountNumber);
                        if (account != null) {
                            user.addAccount(account);
                        }
                    }
                }
                users.put(id, user);
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

    public Account createAccount(String accountType, String userId, double interestRate) {
        User user = users.get(userId);
        if (user != null) {
            String accountNumber = generateAccountNumber(accountType);
            Account account;
            if (accountType.equals("aktiekonto")) {
                account = new ShareAccount(accountNumber, interestRate, 0, 0.0, user);
            } else {
                return null;
            }
            user.addAccount(account); // add account to user's account list
            try {
                FileWriter writer = new FileWriter("src/users.txt", true);
                writer.write(accountNumber + "," + userId + "\n");
                writer.close();
                FileWriter accountWriter = new FileWriter("src/accounts.txt", true);
                accountWriter.write(account.getAccountInfo() + "\n");
                accountWriter.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return account;
        }
        return null;
    }

    public Account getAccount(String accountNumber) {
        try {
            File file = new File("src/accounts.txt");
            Scanner scanner = new Scanner(file);

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] parts = line.split(",");
                String num = parts[0];
                String userId = parts[1];
                double balance = Double.parseDouble(parts[2]);
                double interestRate = Double.parseDouble(parts[3]);
                String accountType = parts[4];

                if (num.equals(accountNumber)) {
                    User accountOwner = getUser(userId);
                    if (accountType.equals("Sparkonto")) {
                        return new SavingAccount(num, interestRate, balance, accountOwner);
                    } else if (accountType.equals("Lånekonto")) {
                        return new LoanAccount(num, interestRate, balance, accountOwner);
                    } else if (accountType.equals("Kortkonto")) {
                        int cardNum = Integer.parseInt(parts[5]);
                        return new CardAccount(num, interestRate, cardNum, accountOwner);
                    } else if (accountType.equals("Aktiekonto")) {
                        int numShares = Integer.parseInt(parts[5]);
                        double sharePrice = Double.parseDouble(parts[6]);
                        return new ShareAccount(num, interestRate, numShares, sharePrice, accountOwner);
                    }
                }
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String generateAccountNumber(String accountType) {
        int uniqueNumber = accountNumberCounter;
        accountNumberCounter++;
        return accountType.substring(0, 2).toUpperCase() + String.format("%010d", uniqueNumber);
    }

    public String getClearingNumber() {
        return this.clearingNumber;
    }

    public Map<String, Account> getAccounts() {
        return this.accounts;
    }

    public void removeAccount(String accountNumber) {
        this.accounts.remove(accountNumber);
    }

    public String generateUniqueCardAccountNumber() {
        int uniqueNumber = cardAccountNumberCounter;
        cardAccountNumberCounter++;
        return String.format("%08d", uniqueNumber);
    }

    public void saveData() {
        saveUsers();
        saveAccounts();
    }

    public void saveUsers() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(USERS_FILE))) {
            for (User user : users.values()) {
                writer.write(user.getId() + "," + user.getName() + "," + user.getPassword());
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving users: " + e.getMessage());
        }
    }

    public void saveAccounts() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(ACCOUNTS_FILE))) {
            for (Account account : accounts.values()) {
                String accountType = account.getClass().getSimpleName();
                writer.write(accountType + "," + account.getAccountNumber() + "," + account.getAccountOwner().getId()
                        + "," + account.getInterestRate());

                if (account instanceof SavingAccount) {
                    SavingAccount savingAccount = (SavingAccount) account;
                    writer.write("," + savingAccount.getBalance());
                } else if (account instanceof LoanAccount) {
                    LoanAccount loanAccount = (LoanAccount) account;
                    writer.write("," + loanAccount.getBalance());
                } else if (account instanceof CardAccount) {
                    CardAccount cardAccount = (CardAccount) account;
                    writer.write("," + cardAccount.getCardNumber());
                } else if (account instanceof ShareAccount) {
                    ShareAccount shareAccount = (ShareAccount) account;
                    writer.write("," + shareAccount.getNumShares() + "," + shareAccount.getSharePrice());
                }

                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving accounts: " + e.getMessage());
        }
    }

}
