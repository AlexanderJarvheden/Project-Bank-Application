import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Transfer from '../src/Transfer';


const TransferScreen = ({ user, bank }) => {
    if (!user) {
        return (
            <View>
                <Text>Please sign in to access the Transfer screen.</Text>
            </View>
        );
    }
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [transferAmount, setTransferAmount] = useState('');

    const handleTransfer = () => {
        if (!fromAccount || !toAccount || !transferAmount) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const amount = parseFloat(transferAmount);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Error', 'Invalid transfer amount.');
            return;
        }

        const validationResult = bank.validateTransfer(fromAccount, toAccount);
        if (!validationResult.success) {
            Alert.alert('Error', validationResult.message);
            return;
        }

        bank.performTransfer(fromAccount, toAccount, amount);
        Alert.alert('Success', 'Transfer completed successfully.');
    };

    useEffect(() => {
        const accounts = Array.from(user.getUserAccounts().values());
        console.log(accounts); // Add this line
        if (accounts.length > 0 && !fromAccount) {
            setFromAccount(accounts[0].getAccountNumber());
        }
    }, [user]);



    return (
        <ScrollView>
            <View>
                <Text>Transfer Money</Text>
                <Picker
                    selectedValue={fromAccount}
                    onValueChange={(itemValue) => setFromAccount(itemValue)}
                >
                    {Array.from(user.getUserAccounts().values()).map((account, index) => {
                        console.log(account); // Add this line
                        return (
                            <Picker.Item
                                key={index}
                                label={`${account.getAccountNumber()} - ${account.getAccountType()}`}
                                value={account.getAccountNumber()}
                            />
                        );
                    })}

                </Picker>
                <TextInput
                    placeholder="To account"
                    onChangeText={(text) => setToAccount(text)}
                    value={toAccount}
                />
                <TextInput
                    placeholder="Amount"
                    onChangeText={(text) => setTransferAmount(text)}
                    value={transferAmount}
                />
                <Button title="Transfer" onPress={handleTransfer} />
            </View>
            <View>
                <Text>Incoming Transfers</Text>
                {user.getIncomingTransfers().map((transfer, index) => (
                    <View key={index}>
                        <Text>{`From: ${transfer.fromAccount}`}</Text>
                        <Text>{`Amount: ${transfer.amount}`}</Text>
                        <Text>{`Date: ${transfer.date}`}</Text>
                    </View>
                ))}
            </View>
            <View>
                <Text>Scheduled Transfers</Text>
                {user.getScheduledTransfers().map((transfer, index) => (
                    <View key={index}>
                        <Text>{`To: ${transfer.toAccount}`}</Text>
                        <Text>{`Amount: ${transfer.amount}`}</Text>
                        <Text>{`Scheduled Date: ${transfer.scheduledDate}`}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default TransferScreen;
