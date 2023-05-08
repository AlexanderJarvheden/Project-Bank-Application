
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User class. Contains a map of the users accounts, so that each user can be
 * connected to multiple accounts
 * depending on what type of account(s) they have.
 * 
 * @author Joachim Olsson
 * @author Alexander Järvheden
 * @author Aziz Ali
 * 
 */

public class User {

    private String id;
    private String name;
    private String password;
    private List<String> accountNumbers; // Updated: Store account numbers instead of Account objects
    private Map<String, Account> accounts;

    public User(String id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.accountNumbers = new ArrayList<>(); // Updated: Initialize accountNumbers list
        this.accounts = new HashMap<>();
    }

    public String getPassword() {
        return this.password;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getAccountNumbers() { // Updated: Return account numbers instead of Account objects
        return accountNumbers;
    }

    public Account getAccount(String accountNumber) { // New method: Get an Account object by account number
        return accounts.get(accountNumber);
    }

    public void addAccount(Account account) {
        accountNumbers.add(account.getAccountNumber());
        accounts.put(account.getAccountNumber(), account);
    }

    public void removeAccount(Account account) {
        accountNumbers.remove(account.getAccountNumber()); // Updated: Remove account number from the list
        accounts.remove(account.getAccountNumber()); // Updated: Remove account from the map
    }
}