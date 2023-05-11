import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './User';

class Database {
  static async storeUser(key, user) {
    try {
      if (user === null || user === undefined) {
        console.error('Error: Trying to store a null/undefined value. Key:', key);
        return;
      }

      let userCopy = Object.assign({}, user);
      userCopy.userAccounts = [...user.userAccounts].reduce((obj, [key, value]) => (
        Object.assign(obj, { [key]: value }) // convert the Map to an Object
      ), {});

      await AsyncStorage.setItem(key, JSON.stringify(userCopy));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }


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


  static async getUser(personalNumber) {
    try {
      const jsonString = await AsyncStorage.getItem(personalNumber);
      const userData = jsonString ? JSON.parse(jsonString) : null;

      if (userData) {
        const user = new User(userData.id, userData.name, userData.password);
        user.userAccounts = Object.entries(userData.userAccounts).reduce((map, [key, value]) => {
          map.set(key, value); // convert the Object back to a Map
          return map;
        }, new Map());

        return user;
      }

      return null;

    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }



  static async removeAccountNumberCounter(bank) {
    await AsyncStorage.removeItem(bank);
  }

  static async removeUser(personalNumber) {
    try {
      await AsyncStorage.removeItem(personalNumber);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  }
}
export default Database