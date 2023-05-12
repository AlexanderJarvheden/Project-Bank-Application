import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { Stack, Link } from 'expo-router'
import SignIn from "../components/signin/signIn";
import { COLORS, FONT, SIZES } from '../constants';
import { View, Text, TextInput, StyleSheet } from 'react-native';



const LoanPlatformScreen = ({ signedInUser }) => {
    const [totalLoans, setTotalLoans] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [amortizedAmount, setAmortizedAmount] = useState(0);
    const [loanAccount, setLoanAccount] = useState(null);
    const [loanAmount, setLoanAmount] = useState(0);
    const [repaymentAmount, setRepaymentAmount] = useState(0);
    const takeLoan = async (amount) => {
        // Take a loan from the bank and create a loan account
        let newLoanAccount = await bank.createLoanAccount(signedInUser, amount);
        setLoanAccount(newLoanAccount);
    };

    const scbRate = 0.5;

    useEffect(() => {
        // Fetch loan account if it exists
        let loanAccount = signedInUser.getLoanAccount();
        if (loanAccount) {
            setLoanAccount(loanAccount);
        }
    }, [signedInUser]);


    const repayLoan = (amount) => {
        // Repay the loan
        if (loanAccount && amount <= loanAccount.getBalance()) {
            loanAccount.repay(amount);
            setLoanAccount({ ...loanAccount }); // Trigger re-render
        } else {
            console.error("Invalid repayment amount.");
        }
    };

    return (
        // ...

        <Text>Loan Amount</Text>
        <TextInput
            value={loanAmount.toString()}
            onChangeText={(text) => setLoanAmount(Number(text))}
        />

        <Button
            title="Take Loan"
            onPress={() => takeLoan(loanAmount)}
        />

        {
        loanAccount && (
            <>
                <Text>Loan Account: {loanAccount.getAccountNumber()}</Text>
                <Text>Loan Balance: {loanAccount.getBalance()}</Text>

                <Text>Repayment Amount</Text>
                <TextInput
                    value={repaymentAmount.toString()}
                    onChangeText={(text) => setRepaymentAmount(Number(text))}
                />

                <Button
                    title="Repay Loan"
                    onPress={() => repayLoan(repaymentAmount)}
                />
            </>
        )
    }

        // ...

    );
};

export default LoanPlatformScreen;


