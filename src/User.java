
import java.util.HashMap;
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
    private Map<String, Account> userAccounts;

    public User(String id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.userAccounts = new HashMap<>();
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

    public Map<String, Account> getUserAccounts() {
        return userAccounts;
    }

    public void addAccount(Account account) {
        userAccounts.put(account.getAccountNumber(), account);
    }

    public void removeAccount(String accountNumber) {
        userAccounts.remove(accountNumber);
    }

}