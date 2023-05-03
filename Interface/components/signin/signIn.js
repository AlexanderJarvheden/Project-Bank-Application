import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import User from '../../src/User';

const SignIn = () => {
    const [emailOrPersonalnumber, setEmailOrPersonalnumber] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignIn = () => {
        if(!User.signIn(emailOrPersonalnumber, password)){
            Alert.alert('Error', 'Invalid email or password.');
        }
        Alert.alert('Error', 'Invalid email or password.');
    };
  
   
    return (
      <View style={styles.container}>
        <TextInput
          style={{...styles.input, color: '#fffff'}}
          placeholder="Email or Personal-Number"
          onChangeText={setEmailOrPersonalnumber}
          value={emailOrPersonalnumber}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSignIn()}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Sign in</Text>
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

export default SignIn;
