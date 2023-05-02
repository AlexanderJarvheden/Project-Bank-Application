const bank = new Bank("1234");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let users = new Map();

rl.setPrompt("Ange ditt val: ");

rl.on('line', (input) => {
    switch (input.trim()) {
        case '1':
            // Create user
            rl.question("Ange användarnamn: ", (username) => {
                rl.question("Ange lösenord: ", (password) => {
                    users.set(username, new User(username, password));
                    console.log("Användare skapad!");
                    rl.prompt();
                });
            });
            break;
        case '2':
            // Create account
            rl.question("Ange användarnamn: ", (username) => {
                let user = users.get(username);
                if (user) {
                    rl.question("Ange kontotyp (t.ex. sparkonto, lönekonto): ", (accountType) => {
                        rl.question("Ange räntesats (t.ex. 0.02 för 2%): ", (interestRate) => {
                            let createdAccount = bank.createAccount(accountType, user, interestRate);
                            let accountNumber = createdAccount.getAccountNumber();
                            console.log("Konto skapat med kontonummer: " + accountNumber);
                            rl.prompt();
                        });
                    });
                } else {
                    console.log("Användaren hittades inte.");
                    rl.prompt();
                }
            });
            break;
        case '3':
            // Show balance
            rl.question("Ange kontonummer: ", (accountNumber) => {
                let account = bank.getAccount(accountNumber);
                if (account) {
                    console.log("Saldo: " + account.getBalance());
                } else {
                    console.log("Kontot hittades inte.");
                }
                rl.prompt();
            });
            break;
        case '4':
            // Deposit
            rl.question("Ange kontonummer: ", (accountNumber) => {
                rl.question("Ange belopp att sätta in: ", (depositAmount) => {
                    let account = bank.getAccount(accountNumber);
                    if (account) {
                        account.deposit(depositAmount);
                        console.log("Insättning genomförd!");
                    } else {
                        console.log("Kontot hittades inte.");
                    }
                    rl.prompt();
                });
            });
            break;
        case '5':
            // Withdrawal
            rl.question("Ange kontonummer: ", (accountNumber) => {
                rl.question("Ange belopp att ta ut: ", (withdrawalAmount) => {
                    let account = bank.getAccount(accountNumber);
                    if (account) {
                        if (account.withdraw(withdrawalAmount)) {
                            console.log("Uttag genomfört!");
                        } else {
                            console.log("Otillräckligt saldo för uttag.");
                        }
                    } else {
                        console.log("Kontot hittades inte.");
                    }
                    rl.prompt();
                });
            });
            break;
        case '6':
            console.log("Tack för att du använt bankappen!");
            process.exit(0);
        default:
            console.log("Ogiltigt val. Försök igen.");
            rl.prompt();
    }
});

console.log("Välkommen till bankappen! Välj ett alternativ:");
console.log("1. Skapa användare");
console.log("2. Skapa konto");
console.log("3. Visa saldo");
