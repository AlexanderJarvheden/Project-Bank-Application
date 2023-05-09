const readline = require("readline");
const Bank = require("./Bank"); // Assuming you have a separate Bank class implemented

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bank = new Bank("1234");
let loggedInUser = null;
let loggedIn = false;

function main() {
    console.log("Welcome to the bank app! Choose an option:");

    if (loggedIn) {
        console.log("1. Create account");
        console.log("2. Show balance");
        console.log("3. Deposit");
        console.log("4. Withdrawal");
        console.log("5. Quit");
    } else {
        console.log("1. Create user");
        console.log("5. Quit");
        console.log("6. Log in");
    }

    rl.question("Enter your choice: ", function (choice) {
        switch (parseInt(choice)) {
            case 1:
                if (loggedIn) {
                    // Create account
                    rl.question("Enter username: ", function (username) {
                        const user = bank.getUser(username);
                        if (user) {
                            rl.question("Enter account type (e.g., savings, checking): ", function (accountType) {
                                rl.question("Enter interest rate (e.g., 0.02 for 2%): ", function (interestRate) {
                                    const createdAccount = bank.createAccount(accountType, user, parseFloat(interestRate));
                                    const accountNumber = createdAccount.getAccountNumber();
                                    console.log("Account created with account number: " + accountNumber);
                                    main();
                                });
                            });
                        } else {
                            console.log("User not found.");
                            main();
                        }
                    });
                } else {
                    // Create user
                    rl.question("Enter username: ", function (userId) {
                        rl.question("Enter name: ", function (name) {
                            rl.question("Enter password: ", function (password) {
                                bank.createUser(userId, name, password);
                                console.log("User created!");
                                main();
                            });
                        });
                    });
                }
                break;
            case 2:
                // Show balance
                rl.question("Enter account number: ", function (accountNumber) {
                    const account = bank.getAccount(accountNumber);
                    if (account) {
                        console.log("Balance: " + account.getBalance());
                    } else {
                        console.log("Account not found.");
                    }
                    main();
                });
                break;
            case 3:
                // Deposit
                rl.question("Enter account number: ", function (accountNumber) {
                    rl.question("Enter amount to deposit: ", function (depositAmount) {
                        const account = bank.getAccount(accountNumber);
                        if (account) {
                            account.deposit(parseFloat(depositAmount));
                            console.log("Deposit successful!");
                        } else {
                            console.log("Account not found.");
                        }
                        main();
                    });
                });
                break;
            case 4:
                // Withdrawal
                rl.question("Enter account number: ", function (accountNumber) {
                    rl.question("Enter amount to withdraw: ", function (withdrawalAmount) {
                        const account = bank.getAccount(accountNumber);
                        if (account) {
                            if (account.withdraw(parseFloat(withdrawalAmount))) {
                                console.log("Withdrawal successful!");
                            } else {
                                console.log("Insufficient balance for withdrawal.");
                            }
                        } else {
                            console.log("Account not found.");
                        }
                        main();
                    });
                });
                break;
            case 5:
                console.log("Thank you for using the bank app!");
                rl.close();
                break;
            case 6:
                if (!loggedIn) {
                    // Log in with existing user
                    rl.question("Enter username: ", function (usernameInput) {
                        const userExisting = bank.getUser(usernameInput);
                        if (userExisting) {
                            rl.question("Enter password: ", function (passwordExisting) {
                                if (userExisting.getPassword() === passwordExisting) {
                                    console.log("Login successful!");
                                    loggedInUser = userExisting;
                                    loggedIn = true;
                                } else {
                                    console.log("Incorrect password. Try again.");
                                }
                                main();
                            });
                        } else {
                            console.log("User not found.");
                            main();
                        }
                    });
                }
                break;
            default:
                console.log("Invalid choice. Try again.");
                main();
        }
    });
}

main();