import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const jsonString = await AsyncStorage.getItem(personalNumber);
      return jsonString ? JSON.parse(jsonString) : null;
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