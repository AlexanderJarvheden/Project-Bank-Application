import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONT, SIZES, SHADOWS } from '../constants/theme';
import Transfer from '../src/Transfer';

const TransferScreen = ({ user, bank }) => {
    if (!user) {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ fontFamily: FONT.bold, fontSize: 18 }}>Please sign in to access the Transfer screen.</Text>
            </View>
        );
    }
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [userAccounts, setUserAccounts] = useState([]);

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

        const validationResult = bank.validateTransfer(fromAccount, toAccount, amount);
        if (!validationResult.success) {
            Alert.alert('Error', validationResult.message);
            return;
        }

        bank.performTransfer(fromAccount, toAccount, amount);
        Alert.alert('Success', 'Transfer completed successfully.');
    };

    useEffect(() => {
        if (user) {
            const accounts = Array.from(user.getUserAccounts().values());
            setUserAccounts(accounts);
            if (accounts.length > 0) {
                setFromAccount(accounts[0].accountNumber);
            }
        }
    }, [user]);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <ScrollView>
                <View>
                    <Text style={styles.title}>Transfer Money</Text>
                    <Picker
                        selectedValue={fromAccount}
                        onValueChange={(itemValue) => setFromAccount(itemValue)}
                        style={styles.picker}
                    >
                        {userAccounts.map((account, index) => {
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
                        style={styles.input}
                        placeholder="To account"
                        placeholderTextColor={COLORS.lightWhite}
                        onChangeText={(text) => setToAccount(text)}
                        value={toAccount}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        placeholderTextColor={COLORS.lightWhite}
                        onChangeText={(text) => setTransferAmount(text)}
                        value={transferAmount}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleTransfer}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Transfer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Incoming Transfers</Text>
                    {user.getIncomingTransfers().map((transfer, index) => (
                        <View key={index}>
                            <Text style={styles.itemText}>{`From: ${transfer.fromAccount}`}</Text>
                            <Text style={styles.itemText}>{`Amount: ${transfer.amount}`}</Text>
                            <Text style={styles.itemText}>{`Date: ${transfer.date}`}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Scheduled Transfers</Text>
                    {user.getScheduledTransfers().map((transfer, index) => (
                        <View key={index}>
                            <Text style={styles.itemText}>{`To: ${transfer.toAccount}`}</Text>
                            <Text style={styles.itemText}>{`Amount: ${transfer.amount}`}</Text>
                            <Text style={styles.itemText}>{`Scheduled Date: ${transfer.scheduledDate}`}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        padding: SIZES.medium,
        backgroundColor: COLORS.secondary,
        marginVertical: SIZES.small,
        borderRadius: SIZES.small,
        ...SHADOWS.medium,
    },
    title: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.primary,
        marginBottom: SIZES.small,
    },
    itemText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    input: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray2,
        marginBottom: SIZES.medium,
    },
    buttonContainer: {
        backgroundColor: COLORS.tertiary,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        alignItems: 'center',
        marginTop: SIZES.medium,
        ...SHADOWS.small,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        marginTop: SIZES.medium,
    },
    buttonContainer: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.small,
        ...SHADOWS.medium,
    },
    buttonText: {
        color: COLORS.lightWhite,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default TransferScreen;