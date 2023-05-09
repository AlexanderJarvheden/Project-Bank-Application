import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import Database from '../../src/DataBase';

const CreateNewUser = ({Bank, created}) => { // Removed async keyword
  const [personalNumber, setpersonalNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateNewUser = async () => {
    const user = await Database.getUser(personalNumber);
    if (!user) {
      const newUser = Bank.newUser(personalNumber, password, name);
      if (newUser) { // Check if newUser is not null or undefined
        await Database.storeUser(personalNumber, newUser);
        Alert.alert('Successful!', 'Welcome ' + name);
        created(false);
      } else {
        Alert.alert('Error', 'Failed to create new user');
      }
    } else {
      Alert.alert('Error', 'User already exists');
      created(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.input, color: 'white' }}
        placeholder="Personal number"
        onChangeText={setpersonalNumber}
        value={personalNumber}
        autoCapitalize="none"
        keyboardType="number-pad"
      />
      <TextInput
        style={{ ...styles.input, color: 'white' }}
        placeholder="Name"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateNewUser}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create user</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: COLORS.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateNewUser;
