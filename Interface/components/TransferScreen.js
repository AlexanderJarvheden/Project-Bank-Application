import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Database from '../src/DataBase';

function TransferScreen({ navigation, bank, user }) {
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = () => {
        if (!fromAccount || !toAccount || !amount) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const fromAccountObj = user.getAccount(fromAccount);
        const toAccountObj = user.getAccount(toAccount);
        const amountNumber = parseFloat(amount);

        if (!fromAccountObj || !toAccountObj) {
            Alert.alert('Error', 'Invalid account number.');
            return;
        }

        if (isNaN(amountNumber) || amountNumber <= 0) {
            Alert.alert('Error', 'Invalid amount.');
            return;
        }

        user.performTransfer(fromAccount, toAccount, amountNumber);
        Database.storeUser(user.id, user);

        Alert.alert('Success', 'Transfer has been made successfully.');
        setFromAccount('');
        setToAccount('');
        setAmount('');
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Transfer Platform</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>From Account Number</Text>
                    <TextInput
                        style={styles.input}
                        value={fromAccount}
                        onChangeText={setFromAccount}
                        keyboardType="numeric"
                        placeholder="Enter from account number"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>To Account Number</Text>
                    <TextInput
                        style={styles.input}
                        value={toAccount}
                        onChangeText={setToAccount}
                        keyboardType="numeric"
                        placeholder="Enter to account number"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="Enter amount"
                    />
                </View>
                <TouchableOpacity onPress={handleTransfer} style={styles.button}>
                    <Text style={styles.buttonText}>Make Transfer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
    },
    button: {
        backgroundColor: '#4a69bd',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default TransferScreen;
