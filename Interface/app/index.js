import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Stack, Link } from 'expo-router'
import SignIn from "../components/signin/signIn";
import { COLORS, SIZES } from '../constants';
import React, { useState, useEffect } from 'react';
import AccountScreen from "../components/accounts/AccountScreen";
import StockMarketTab from "../components/stockmarket/StockMarket";
import Tabs from "../components/tabs/Tabs";
import Bank from "../src/Bank";
import CreateNewUser from "../components/signin/createNewUser";
import User from "../src/User";
import Database from '../src/DataBase';
import TransferScreen from "../components/TransferScreen";
import LoanPlatformScreen from "../components/LoanPlatformScreen";


const tabs = ["Accounts", "Transfer", "Stock Market", "Loans", "Sign out"];

const JobDetails = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInUser, setSignedInUser] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [activeUser, setActiveUser] = useState('');

  const ceriseBank = new Bank(1234);

  const showAllUsers = () => {
    const allUsers = ceriseBank.getAllUsers();
    console.log(allUsers);
  }

  const handleSignIn = async (personalNumber, password) => {
    // Ensure personalNumber is a string
    const stringPersonalNumber = String(personalNumber);

    const user = await Database.getUser(stringPersonalNumber);
    if (user && user.signIn(stringPersonalNumber, password)) {
      setIsSignedIn(true);
      setSignedInUser(user);
    } else {
      Alert.alert('Error', 'Invalid Personal number or password.');
    }
  };



  useEffect(() => {
    const accounts = [
      { id: 1, name: 'Checking', balance: '$1,000.00' },
      { id: 2, name: 'Savings', balance: '$5,000.00' },
      { id: 3, name: 'Credit Card', balance: '$-500.00' },
    ];
    setAccounts(accounts);
  }, []);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const refresh = () => {
    setAccounts([]);
    setActiveTab(tabs[0]);
    setIsSignedIn(false);
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Accounts":
        return <AccountScreen bank={ceriseBank} signedInUser={signedInUser} title="Accounts" />
      case "Transfer":
        return <TransferScreen bank={ceriseBank} user={signedInUser} title="Transfer" />
      case "Stock Market":
        return <StockMarketTab
          title="Stock Market"
        />
      case "Loans":
        return <LoanPlatformScreen bank={ceriseBank} user={ceriseBank.users.get(signedInUser)} />
      case "Sign out":
        refresh();
        break;
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      {isSignedIn ? (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              {displayTabContent()}
            </View>
          </ScrollView>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>
      ) : (
        <ScrollView style={{ backgroundColor: COLORS.primary }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Stack.Screen options={{
              title: "Welcome to your bank", headerStyle: { backgroundColor: COLORS.red },
              headerTitleStyle: { fontSize: 30, color: COLORS.white }
            }}
            />
            <SignIn Bank={ceriseBank} onSignIn={handleSignIn} />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setShowCreateNewUser(true)}>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Arial', textAlign: 'center' }}>
                  New user? Create an account
                </Text>
              </TouchableOpacity>
            </View>
            <CreateNewUser Bank={ceriseBank} created={setShowCreateNewUser} />
            <TouchableOpacity style={styles.button} onPress={showAllUsers}>
              <View style={styles.buttonContainer}>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default JobDetails
const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  }
})