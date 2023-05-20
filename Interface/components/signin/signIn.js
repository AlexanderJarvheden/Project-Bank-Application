import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import Database from '../../src/DataBase';

const SignIn = ({ onSignIn }) => {
  const [personalNumber, setpersonalNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const user = await Database.getUser(personalNumber);
    if (user && user.password === password) {
      onSignIn(personalNumber, password);
    } else {
      Alert.alert('Error', 'Invalid Personal number or password.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.input, color: 'white', width: 250, textAlign: 'center' }}
        placeholder="Personal number"
        placeholderTextColor={'white'}
        onChangeText={setpersonalNumber}
        value={personalNumber}
        autoCapitalize="none"
        keyboardType="number-pad"
      />
      <TextInput
        style={{ ...styles.input, color: 'white', width: 250, textAlign: 'center' }}
        placeholder="Password"
        placeholderTextColor={'white'}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign in</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 120,
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

export default SignIn;