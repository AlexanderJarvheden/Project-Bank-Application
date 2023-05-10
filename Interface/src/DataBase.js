import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './User';

class Database {
  // static async storeUser(key, value) {
  //   try {
  //     if (value === null || value === undefined) {
  //       console.error('Error: Trying to store a null/undefined value. Key:', key);
  //       return;
  //     }

  //     await AsyncStorage.setItem(key, JSON.stringify(value));
  //   } catch (error) {
  //     console.error('Error storing user data:', error);
  //   }
  // }  

  static async storeUser(key, value) {
    try {
      if (value === null || value === undefined) {
        console.error('Error: Trying to store a null/undefined value. Key:', key);
        return;
      }

      const serializedUser = this.serializeUser(value);
      await AsyncStorage.setItem(key, JSON.stringify(serializedUser));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  // static async getUser(personalNumber) {
  //   try {
  //     const jsonString = await AsyncStorage.getItem(personalNumber);
  //     return jsonString ? JSON.parse(jsonString) : null;
  //   } catch (error) {
  //     console.error('Error getting user data:', error);
  //     return null;
  //   }
  // }

  static async getUser(personalNumber) {
    try {
      const jsonString = await AsyncStorage.getItem(personalNumber);
      if (jsonString) {
        const userData = JSON.parse(jsonString);
        return this.deserializeUser(userData);
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

  static serializeUser(user) {
    return {
      ...user,
      userAccounts: Array.from(user.userAccounts.entries()),
      loans: Array.from(user.loans.entries()),
    };
  }

  static deserializeUser(userData) {
    const user = new User(userData.id, userData.name, userData.password);
    user.userAccounts = new Map(userData.userAccounts);
    user.loans = new Map(userData.loans);
    return user;
  }
}
export default Database