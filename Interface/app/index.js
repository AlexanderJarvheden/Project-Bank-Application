import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
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
  const [modalVisible, setModalVisible] = useState(false);
  
  const ceriseBank = new Bank(1234);

  const handleSignIn = async (personalNumber, password) => {
    const user = await Database.getUser(personalNumber);
    if (user && user.signIn(personalNumber, password)) {
      setIsSignedIn(true);
      setSignedInUser(user);
    } else {
      Alert.alert('Error', 'Invalid Personal number or password.');
    }
  };



  const [activeTab, setActiveTab] = useState(tabs[0]);
  const refresh = () => {
    setActiveTab(tabs[0]);
    setIsSignedIn(false);
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Accounts":
        return <AccountScreen bank={ceriseBank} signedInUser={signedInUser}
          title="Accounts" />
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
              title: "CeriseBank", headerStyle: { backgroundColor: COLORS.red },
              headerTitleStyle: { fontSize: 30, color: COLORS.white }
            }}
            />
            <SignIn Bank={ceriseBank} onSignIn={handleSignIn} />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { setShowCreateNewUser(true); setModalVisible(true); }}>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Arial', textAlign: 'center' }}>
                  New user? Create an account
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <Pressable style={styles.outsideModal}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    setModalVisible(false);
                  }
                }} >
                <View style={styles.modal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                      <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>X</Text>
                      </View>
                    </TouchableOpacity>
                    <CreateNewUser Bank={ceriseBank} created={setModalVisible} />
                  </View>
                </View>
              </Pressable>
            </Modal>


          </View>
        </ScrollView>
      )
      }
    </SafeAreaView >
  )
}

export default JobDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    margin: 50,
    padding: 3,
    backgroundColor: COLORS.secondary,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  /* The content of the modal takes all the vertical space not used by the header. */
  modalContent: {
    backgroundColor: COLORS.primary,
    flex: 1,
    borderWidth: 1,
    borderColor: "black"
  },
  modalHeader: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "white"
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  outsideModal: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  button: {
    width: '100%',
    alignItems: 'left',
    marginTop: 20,
    marginLeft: 20
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
})