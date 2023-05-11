import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import { Picker } from '@react-native-picker/picker';
import Account from '../../src/Account';
import Bank from '../../src/Bank';

const CreateNewAccount = ({ bank, created, user }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [name, setName] = useState('');

    const handleCreateNewAccount = async () => {  // Add 'async' here
        const newAccount = await bank.createAccount(accountType, user);  // Add 'await' here
        setAccountNumber(newAccount.getAccountNumber())
        Alert.alert('Successful!', 'Your new account ' + name + " has the account number: " + bank.getClearingNumber() + "-" + accountNumber);
        created(false);
    };

    return (
        <View style={styles.container}>
            {/* <Picker
                style={styles.picker}
                selectedValue={accountType}
                onValueChange={(itemValue) => setAccountType(itemValue)}
            >
                <Picker.Item label="Select an account type" value="" />
                {Array.from(bank.accountTypes.keys()).map((accountType) => (
                    <Picker.Item label={accountType} value={accountType} key={accountType} />

                ))}
            </Picker> */}
            <TextInput
                style={{ ...styles.input, color: 'white' }}
                placeholder="Name"
                onChangeText={setName}
                value={name}
                autoCapitalize="words"
                keyboardType="default"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateNewAccount}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Create account</Text>
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

export default CreateNewAccount;