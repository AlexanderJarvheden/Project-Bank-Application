package src;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankMain {

    public static void main(String[] args) {
        Bank bank = new Bank("1234");
        Scanner scanner = new Scanner(System.in);
        Map<String, User> users = new HashMap<>();

        while (true) {
            System.out.println("Välkommen till bankappen! Välj ett alternativ:");
            System.out.println("1. Skapa användare");
            System.out.println("2. Skapa konto");
            System.out.println("3. Visa saldo");
            System.out.println("4. Insättning");
            System.out.println("5. Uttag");
            System.out.println("6. Avsluta");
            System.out.print("Ange ditt val: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Ta bort radbrytningen

            switch (choice) {
                case 1:
                    // Create user
                    System.out.print("Ange användarnamn: ");
                    String username = scanner.nextLine();
                    System.out.print("Ange lösenord: ");
                    String password = scanner.nextLine();
                    users.put(username, new User(username, password));
                    System.out.println("Användare skapad!");
                    break;
                case 2:
                    // Create account
                    System.out.print("Ange användarnamn: ");
                    username = scanner.nextLine();
                    User user = users.get(username);
                    if (user != null) {
                        System.out.print("Ange kontotyp (t.ex. sparkonto, lönekonto): ");
                        String accountType = scanner.nextLine();
                        System.out.print("Ange räntesats (t.ex. 0.02 för 2%): ");
                        double interestRate = scanner.nextDouble();
                        scanner.nextLine();
                        Account createdAccount = bank.createAccount(accountType, user, interestRate);
                        String accountNumber = createdAccount.getAccountNumber();
                        System.out.println("Konto skapat med kontonummer: " + accountNumber);
                    } else {
                        System.out.println("Användaren hittades inte.");
                    }
                    break;
                case 3:
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
                case 4:
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
                case 5:
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
                case 6:
                    System.out.println("Tack för att du använt bankappen!");
                    System.exit(0);
                default:
                    System.out.println("Ogiltigt val. Försök igen.");
            }
        }
    }
}
