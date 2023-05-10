import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './User';
<<<<<<< HEAD
=======

>>>>>>> Loan-platform-js

class Database {
  static async storeUser(key, value) {
    try {
      if (value === null || value === undefined) {
        console.error('Error: Trying to store a null/undefined value. Key:', key);
        return;
      }

      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }
<<<<<<< HEAD

  static async storeAccountNumberCounter(bank, value) {
    try {
      if (value === null || value === undefined) {
        console.error('Error: Trying to store a null/undefined value. Key:', bank);
        return;
      }

      await AsyncStorage.setItem(bank, value.toString());
    } catch (error) {
      console.error('Error storing account number counter:', error);
    }
  }

  static async getAccountNumberCounter(bank) {
    try {
      const value = await AsyncStorage.getItem(bank);

      if (value !== null) {
        return parseInt(value, 10);
      } else {
        // Initialize the counter with 1 and store it
        await this.storeAccountNumberCounter(bank, 1);
        return 1;
      }
    } catch (error) {
      console.error('Error getting account number counter:', error);
    }
    return 1;
  }

=======
>>>>>>> Loan-platform-js

  static async getUser(personalNumber) {
    try {
      console.log('Trying to get user with personalNumber:', personalNumber); // Add this line

      const jsonString = await AsyncStorage.getItem(personalNumber);
      const userData = jsonString ? JSON.parse(jsonString) : null;

      if (userData) {
        const user = new User(userData.id, userData.name, userData.password);
        // Re-assign other properties if necessary
        // For example, if you have a property called 'userAccounts':
        if (userData.userAccounts) {
          for (const accountNumber in userData.userAccounts) {
<<<<<<< HEAD
            user.userAccounts.set(accountNumber, userData.userAccounts[accountNumber]);
=======
            const accountData = userData.userAccounts[accountNumber];
            const account = new Account(accountData.accountNumber, accountData.accountType, user);
            // Assign other properties if necessary
            account.balance = accountData.balance;
            user.userAccounts.set(accountNumber, account);
>>>>>>> Loan-platform-js
          }
        }
        return user;
      }
      return null;

    } catch (error) {
      console.error('Error getting user data:', error);

      return null;
    }
  }

<<<<<<< HEAD
  static async removeAccountNumberCounter(bank) {
    await AsyncStorage.removeItem(bank);
  }
=======

>>>>>>> Loan-platform-js

  static async removeUser(personalNumber) {
    try {
      await AsyncStorage.removeItem(personalNumber);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  }
}
export default Database