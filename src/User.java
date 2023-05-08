
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
    private List<Account> accounts;

    public User(String id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.accounts = new ArrayList<>();
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

    public List<Account> getAccounts() {
        return accounts;
    }

    public void addAccount(Account account) {
        accounts.add(account);
    }

    public void removeAccount(Account account) {
        accounts.remove(account);
    }
}