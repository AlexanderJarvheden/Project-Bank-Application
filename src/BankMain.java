
import java.util.Scanner;

public class BankMain {

    public static void main(String[] args) {
        Bank bank = new Bank("1234");
        Scanner scanner = new Scanner(System.in);
        User loggedInUser = null;

        boolean loggedIn = false;
        while (true) {
            System.out.println("Välkommen till bankappen! Välj ett alternativ:");

            if (loggedIn) {
                System.out.println("1. Skapa konto");
                System.out.println("2. Visa saldo");
                System.out.println("3. Insättning");
                System.out.println("4. Uttag");
                System.out.println("5. Avsluta");
            } else {
                System.out.println("1. Skapa användare");
                System.out.println("5. Avsluta");
                System.out.println("6. Logga in");
            }

            System.out.print("Ange ditt val: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Ta bort radbrytningen

            switch (choice) {
                case 1:
                    if (loggedIn) {
                        // Create account
                        System.out.print("Ange användarnamn: ");
                        String username = scanner.nextLine();
                        User user = bank.getUser(username);
                        if (user != null) {
                            System.out.print("Ange kontotyp (t.ex. sparkonto, lönekonto): ");
                            String accountType = scanner.nextLine();
                            System.out.print("Ange räntesats (t.ex. 0.02 för 2%): ");
                            double interestRate = scanner.nextDouble();
                            scanner.nextLine();
                            Account createdAccount = bank.createAccount(accountType, user, interestRate);
                            String accountNumber = createdAccount.getAccountNumber();
                            System.out.println("Konto skapat med kontonummer: " + accountNumber);
                        } else if (user == null) {
                            System.out.println("Användaren hittades inte.");
                        }
                    } else {
                        System.out.print("Ange användarnamn: ");
                        String userId = scanner.nextLine();
                        System.out.print("Ange namn: ");
                        String name = scanner.nextLine();
                        System.out.print("Ange lösenord: ");
                        String password = scanner.nextLine();
                        bank.createUser(userId, name, password);
                        System.out.println("Användare skapad!");
                    }
                    break;

                case 2:
                    // Show balance
                    System.out.print("Ange kontonummer: ");
                    String accountNumber = scanner.nextLine();
                    Account account = bank.getAccount(accountNumber);
                    if (account != null) {
                        System.out.println("Saldo: " + account.getBalance());
                    } else {
                        System.out.println("Kontot hittades inte.");
                    }
                    break;
                case 3:
                    // Deposit
                    System.out.print("Ange kontonummer: ");
                    accountNumber = scanner.nextLine();
                    System.out.print("Ange belopp att sätta in: ");
                    double depositAmount = scanner.nextDouble();
                    scanner.nextLine();
                    account = bank.getAccount(accountNumber);
                    if (account != null) {
                        account.deposit(depositAmount);
                        System.out.println("Insättning genomförd!");
                    } else {
                        System.out.println("Kontot hittades inte.");
                    }
                    break;
                case 4:
                    // Withdrawal
                    System.out.print("Ange kontonummer: ");
                    accountNumber = scanner.nextLine();
                    System.out.print("Ange belopp att ta ut: ");
                    double withdrawalAmount = scanner.nextDouble();
                    scanner.nextLine();
                    account = bank.getAccount(accountNumber);
                    if (account != null) {
                        if (account.withdraw(withdrawalAmount)) {
                            System.out.println("Uttag genomfört!");
                        } else {
                            System.out.println("Otillräckligt saldo för uttag.");
                        }
                    } else {
                        System.out.println("Kontot hittades inte.");
                    }
                    break;
                case 5:
                    System.out.println("Tack för att du använt bankappen!");
                    System.exit(0);
                    break;
                case 6:
                    if (!loggedIn) {
                        // Log in with existing user
                        System.out.print("Ange användarnamn: ");
                        String usernameInput = scanner.nextLine();
                        User userExisting = bank.getUser(usernameInput);
                        if (userExisting != null) {
                            System.out.print("Ange lösenord: ");
                            String passwordExisting = scanner.nextLine();
                            if (userExisting.getPassword().equals(passwordExisting)) {
                                System.out.println("Inloggning lyckades!");
                                loggedInUser = userExisting;
                                loggedIn = true;
                            } else {
                                System.out.println("Fel lösenord. Försök igen.");
                            }
                        } else {
                            System.out.println("Användaren hittades inte.");
                        }
                    }
                    break;
                default:
                    System.out.println("Ogiltigt val. Försök igen.");
            }
        }
    }
}
