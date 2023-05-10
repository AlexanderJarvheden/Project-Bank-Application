import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TransferScreen = ({ user, bank }) => {
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


    return (
        <ScrollView>
            <View>
                <Text>Transfer Money</Text>
                <Picker
                    selectedValue={fromAccount}
                    onValueChange={(itemValue) => setFromAccount(itemValue)}>
                    {Array.from(user.getUserAccounts().values()).map((account, index) => (
                        <Picker.Item key={index} label={account.getAccountNumber()} value={account.getAccountNumber()} />
                    ))}
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
