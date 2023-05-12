import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';


function TransferScreen({ navigation, bank, user }) {
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        console.log('Navigation:', navigation);
    }, [navigation]);

    const handleTransfer = () => {
        console.log('User:', user);
        console.log('User methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(user)));
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
        Alert.alert('Success', 'Transfer has been made successfully.');
        navigation.goBack();
    }

    return (
        <View>
            <TextInput
                placeholder="From Account Number"
                onChangeText={setFromAccount}
                value={fromAccount}
            />
            <TextInput
                placeholder="To Account Number"
                onChangeText={setToAccount}
                value={toAccount}
            />
            <TextInput
                placeholder="Amount"
                onChangeText={setAmount}
                value={amount}
                keyboardType="numeric"
            />
            <Button title="Transfer" onPress={handleTransfer} />
        </View>
    );
}

export default TransferScreen;
