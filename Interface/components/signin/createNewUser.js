import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import Database from '../../src/DataBase';

const CreateNewUser = ({Bank, created}) => { // Removed async keyword
  const [personalNumber, setpersonalNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleCreateNewUser = async () => {
    const user = await Database.getUser(personalNumber);
    if (!user && personalNumber != '' && name != '' && password != '') {
      const newUser = Bank.newUser(personalNumber, password, name);
      if (newUser) {
        await Database.storeUser(personalNumber, newUser);
        Alert.alert('Successful!', 'Welcome ' + name);
        created(false);
      } else {
        Alert.alert('Error', 'Failed to create new user');
      }
    } else if (personalNumber == '' || name == '' || password == ''){
      Alert.alert('Invalid input', '');
      created(true);
    }
    else {
      Alert.alert('Error', 'User already exists');
      created(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.input, color: 'white', textAlign: 'center'  }}
        placeholder="Personal number"
        placeholderTextColor="#FFF"
        onChangeText={setpersonalNumber}
        value={personalNumber}
        autoCapitalize="none"
        keyboardType="number-pad"
      />
      <TextInput
        style={{ ...styles.input, color: 'white', textAlign: 'center'  }}
        placeholder="Name"
        placeholderTextColor="#FFF"
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
        keyboardType="default"
      />
      <TextInput
        style={{...styles.input, color: 'white', textAlign: 'center' }}
        placeholder="Password"
        placeholderTextColor="#FFF"
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
    backgroundColor: COLORS.primary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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