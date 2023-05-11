import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LoanPlatform from '../src/LoanPlatform';


const LoanPlatformScreen = ({ bank, user }) => {
    const loanPlatform = new LoanPlatform(bank);

    const [loanAmount, setLoanAmount] = React.useState('');
    const [interestRate, setInterestRate] = React.useState('');
    const [paymentAmount, setPaymentAmount] = React.useState('');

    const handleCreateLoan = () => {
        if (loanAmount && interestRate) {
            loanPlatform.createLoan(user, parseFloat(loanAmount), parseFloat(interestRate));
            setLoanAmount('');
            setInterestRate('');
        }
    };

    const handleMakePayment = () => {
        if (paymentAmount) {
            loanPlatform.makePayment(user, parseFloat(paymentAmount));
            setPaymentAmount('');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Loan Platform</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Loan Amount</Text>
                    <TextInput
                        style={styles.input}
                        value={loanAmount}
                        onChangeText={setLoanAmount}
                        keyboardType="numeric"
                        placeholder="Enter loan amount"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Interest Rate</Text>
                    <TextInput
                        style={styles.input}
                        value={interestRate}
                        onChangeText={setInterestRate}
                        keyboardType="numeric"
                        placeholder="Enter interest rate"
                    />
                </View>
                <TouchableOpacity onPress={handleCreateLoan} style={styles.button}>
                    <Text style={styles.buttonText}>Create Loan</Text>
                </TouchableOpacity>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Payment Amount</Text>
                    <TextInput
                        style={styles.input}
                        value={paymentAmount}
                        onChangeText={setPaymentAmount}
                        keyboardType="numeric"
                        placeholder="Enter payment amount"
                    />
                </View>
                <TouchableOpacity onPress={handleMakePayment} style={styles.button}>
                    <Text style={styles.buttonText}>Make Payment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

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

export default LoanPlatformScreen;

