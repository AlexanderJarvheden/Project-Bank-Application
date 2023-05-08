// // const fs = require('fs');
// // const User = require('./User'); // Make sure you have the User class in a separate file and import it
// // const Account = require('./Account');
// import User from "../src/User"

// class Bank {
//     constructor(clearingNumber) {
//         this.clearingNumber = clearingNumber;
//         this.totalCapitalInBank = 0;
//         this.liquidCash = 0;
//         this.totalCapitalLoanedOut = 0;
//         this.accounts = new Map();
//         this.users = new Map();
//         this.accountNumberCounter = 0;
//         // this.USERS_FILE_PATH = 'src/users.txt';
//         // this.loadUsersFromFile();
//         patientZero = new User("021101", "Alexander Järvheden", "123");
//         this.users.set(patientZero.getId(), patientZero);
//     }

//     newUser(personalNumber, password, name) {
//         newUser = new User(personalNumber, name, password)
//         this.users.set(personalNumber, newUser); // Saves the user in the database and gets called by its personalnumber
//     }

//     // saveUsersToFile() {
//     //     try {
//     //         if (!fs.existsSync(this.USERS_FILE_PATH)) {
//     //             fs.writeFileSync(this.USERS_FILE_PATH, '');
//     //         }
//     //         const usersData = Array.from(this.users.values()).map((user) => {
//     //             return `${user.getId()},${user.getName()},${user.getPassword()}`;
//     //         }).join('\n');
//     //         fs.writeFileSync(this.USERS_FILE_PATH, usersData);
//     //     } catch (e) {
//     //         console.log('Failed to save users to file.');
//     //         console.error(e);
//     //     }
//     // }

//     // loadUsersFromFile() {
//     //     try {
//     //         const fileContents = fs.readFileSync(this.USERS_FILE_PATH, 'utf8');
//     //         const lines = fileContents.trim().split('\n');
//     //         for (const line of lines) {
//     //             const fields = line.split(',');
//     //             const id = fields[0];
//     //             const name = fields[1];
//     //             const password = fields[2];
//     //             this.createUser(id, name, password);
//     //         }
//     //     } catch (e) {
//     //         console.log('Failed to load users from file.');
//     //         console.error(e);
//     //     }
//     // }

//     login(userId, password) {
//         const user = this.getUser(userId);
//         if (user !== undefined && user.getPassword() === password) {
//             return user;
//         } else {
//             return null;
//         }
//     }

//     createUser(userId, name, password) {
//         const newUser = new User(userId, name, password);
//         this.users.set(userId, newUser);
//         try {
//             fs.appendFileSync('users.txt', `${userId},${name},${password}\n`);
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     getUser(id) {
//         return this.users.get(id);
//     }

//     createAccount(accountType, user, interestRate) {
//         const accountNumber = this.generateUniqueAccountNumber();
//         const newAccount = new Account(accountNumber, accountType, user, interestRate);
//         this.accounts.set(accountNumber, newAccount);
//         user.addAccount(newAccount);
//         return newAccount;
//     }

//     getAccount(accountNumber) {
//         return this.accounts.get(accountNumber);
//     }

//     generateUniqueAccountNumber() {
//         const uniqueNumber = this.accountNumberCounter;
//         this.accountNumberCounter++;
//         return uniqueNumber.toString().padStart(10, '0');
//     }

//     removeAccount(accountNumber) {
//         this.accounts.delete(accountNumber);
//     }

//     addCapital(amount) {
//         this.totalCapitalInBank += amount;
//     }

//     removeCapital(amount) {
//         this.totalCapitalInBank -= amount;
//     }

//     addLiquidCash(amount) {
//         this.liquidCash += amount;
//     }

//     removeLiquidCash(amount) {
//         this.liquidCash -= amount;
//     }

//     addCapitalLoanedOut(amount) {
//         this.totalCapitalLoanedOut += amount;
//     }

//     removeCapitalLoanedOut(amount) {
//         this.totalCapitalLoanedOut -= amount;
//     }
// }

// module.exports = Bank;




// const fs = require('fs');
// const User = require('./User'); // Make sure you have the User class in a separate file and import it
// const Account = require('./Account');
// const User = require('./User'); // Make sure you have the User class in a separate file and import it
// const Account = require('./Account');
import User from "../src/User"
import Account from "./Account";

class Bank {
    constructor(clearingNumber) {
        this.clearingNumber = clearingNumber;
        this.totalCapitalInBank = 0;
        this.liquidCash = 0;
        this.totalCapitalLoanedOut = 0;
        this.accounts = new Map();
        this.users = new Map();
        this.accountNumberCounter = 0;
        // this.USERS_FILE_PATH = 'src/users.txt';
        // this.loadUsersFromFile();
        patientZero = new User("021101", "Alexander Järvheden", "123");
        this.users.set(patientZero.getId(), patientZero);
        this.accountTypes = new Map();
        this.accountTypes.set("Savings account", 0.75);
        this.accountTypes.set("Checkings account", '');
        this.accountTypes.set("Credit card", '');
    }

    newUser(personalNumber, password, name) {
        newUser = new User(personalNumber, name, password);
        this.users.set(personalNumber, newUser); // Saves the user in the database and gets called by its personalnumber
    }

    getAllUsers() {
        return Array.from(this.users.values());
    }

    // saveUsersToFile() {
    //     try {
    //         if (!fs.existsSync(this.USERS_FILE_PATH)) {
    //             fs.writeFileSync(this.USERS_FILE_PATH, '');
    //         }
    //         const usersData = Array.from(this.users.values()).map((user) => {
    //             return `${user.getId()},${user.getName()},${user.getPassword()}`;
    //         }).join('\n');
    //         fs.writeFileSync(this.USERS_FILE_PATH, usersData);
    //     } catch (e) {
    //         console.log('Failed to save users to file.');
    //         console.error(e);
    //     }
    // }

    // loadUsersFromFile() {
    //     try {
    //         const fileContents = fs.readFileSync(this.USERS_FILE_PATH, 'utf8');
    //         const lines = fileContents.trim().split('\n');
    //         for (const line of lines) {
    //             const fields = line.split(',');
    //             const id = fields[0];
    //             const name = fields[1];
    //             const password = fields[2];
    //             this.createUser(id, name, password);
    //         }
    //     } catch (e) {
    //         console.log('Failed to load users from file.');
    //         console.error(e);
    //     }
    // }

    login(userId, password) {
        const user = this.getUser(userId);
        if (user !== undefined && user.getPassword() === password) {
            return user;
        } else {
            return null;
        }
    }

    createUser(userId, name, password) {
        const newUser = new User(userId, name, password);
        this.users.set(userId, newUser);
        try {
            fs.appendFileSync('users.txt', `${userId},${name},${password}\n`);
        } catch (e) {
            console.error(e);
        }
    }

    getUser(id) {
        return this.users.get(id);
    }

    createAccount(accountType, user
        // , interestRate
        ) {
        const accountNumber = this.generateUniqueAccountNumber();
        const newAccount = new Account(accountNumber, accountType, user
            // , interestRate
            );
        this.accounts.set(accountNumber, newAccount);
        user.addAccount(newAccount);
        return newAccount;
    }

    getAccount(accountNumber) {
        return this.accounts.get(accountNumber);
    }

    generateUniqueAccountNumber() {
        const uniqueNumber = this.accountNumberCounter;
        this.accountNumberCounter++;
        return uniqueNumber.toString().padStart(10, '0');
    }

    removeAccount(accountNumber) {
        this.accounts.delete(accountNumber);
    }

    addCapital(amount) {
        this.totalCapitalInBank += amount;
    }

    removeCapital(amount) {
        this.totalCapitalInBank -= amount;
    }

    addLiquidCash(amount) {
        this.liquidCash += amount;
    }

    removeLiquidCash(amount) {
        this.liquidCash -= amount;
    }

    addCapitalLoanedOut(amount) {
        this.totalCapitalLoanedOut += amount;
    }

    removeCapitalLoanedOut(amount) {
        this.totalCapitalLoanedOut -= amount;
    }

    getClearingNumber(){
        return this.clearingNumber;
    }
}

module.exports = Bank;