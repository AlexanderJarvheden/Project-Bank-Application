import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './User';

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
            user.userAccounts.set(accountNumber, userData.userAccounts[accountNumber]);
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



  static async removeUser(personalNumber) {
    try {
      await AsyncStorage.removeItem(personalNumber);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  }
}
export default Database