import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import Database from '../../src/DataBase';

const SignIn = ({ Bank, onSignIn }) => {
  const [personalNumber, setPersonalNumber] = useState('');
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
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Personal number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter personal number"
          onChangeText={setPersonalNumber}
          value={personalNumber}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.white,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 4,
    padding: 10,
    color: COLORS.black,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.cerise,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignIn;
