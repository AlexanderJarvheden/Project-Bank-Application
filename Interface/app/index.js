import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Modal } from "react-native";
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

const tabs = ["Accounts", "Transfer", "Stock Market", "Loans", "Sign out"];




const JobDetails = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInUser, setSignedInUser] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [activeUser, setActiveUser] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ceriseBank = new Bank(1234);

  const showAllUsers = () => {
    const allUsers = ceriseBank.getAllUsers();
    console.log(allUsers);
  }

  const handleSignIn = async (personalNumber, password) => {
    const user = await Database.getUser(personalNumber);
    if (user && user.password === password) {
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
        return <AccountScreen bank={ceriseBank} signedInUser={signedInUser}
          title="Accounts" />
      case "Transfer":
        showAllUsers();
        break;
      case "Stock Market":
        return <StockMarketTab
          title="Stock Market"
        />
      case "Loans":
        // Show Loans tab content here
        break;
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
              title: "CeriseBank", headerStyle: { backgroundColor: COLORS.red },
              headerTitleStyle: { fontSize: 30, color: COLORS.white }
            }}
            />
            <SignIn Bank={ceriseBank} onSignIn={handleSignIn} />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { setShowCreateNewUser(true); setIsModalVisible(true); }}>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Arial', textAlign: 'center' }}>
                  New user? Create an account
                </Text>
              </TouchableOpacity>
            </View>
            {/* {showCreateNewUser && (<CreateNewUser Bank={ceriseBank} created={setShowCreateNewUser} />)} */}
            {/* {showCreateNewUser && (
              <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <CreateNewUser Bank={ceriseBank} created={() => setShowCreateNewUser(false)} />
              </View>
            )} */}

            <Modal visible={isModalVisible} animationType='slide'>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
                <CreateNewUser Bank={ceriseBank} created={() => {
                  setShowCreateNewUser(false);
                  setIsModalVisible(false);
                }} />
              </View>
            </Modal>


            <TouchableOpacity style={styles.button} onPress={showAllUsers}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>List all accounts</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
      }
    </SafeAreaView >
  )
}

export default JobDetails
const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
})