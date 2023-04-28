package src;

public class BankMain {
    public static void main(String[] args) {
        Bank bank = new Bank("1234");
        Account account = new Account("1234", "Savings", "Aziz", 0.01);
        Account account2 = new Account("1235", "Savings", "Joachim", 0.01);
        Account account3 = new Account("1236", "Savings", "Alexander", 0.01);

    }
}