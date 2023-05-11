import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import CreateNewAccount from './createNewAccount';
import User from '../../src/User';

const AccountScreen = ({ bank, signedInUser }) => {
  const [createAccount, setCreateAccount] = useState(false);

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (signedInUser && signedInUser.getUserAccounts) {
      const userAccounts = signedInUser.getUserAccounts();
      if (userAccounts.values) {
        setAccounts(Array.from(userAccounts.values()));
      } else {
        console.error('getUserAccounts() does not return a Map or object with a values() method');
      }
    }
  }, [signedInUser]);


  const renderAccount = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontFamily: FONT.bold, fontSize: 18 }}>{item.name}</Text>
      <Text style={{ fontFamily: FONT.regular, fontSize: 16 }}>Balance: ${item.balance}</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <View>
        <Text style={{ fontFamily: FONT.bold, fontSize: 18 }}>{item.accountType}</Text>
        <Text style={{ fontFamily: FONT.regular, fontSize: 16 }}>Balance: ${item.balance}</Text>
      </View>
      <Button title="Delete" onPress={() => handleDeleteAccount(item.accountNumber)} />
    </View>
  );

  const handleDeleteAccount = (accountNumber) => {
    signedInUser.removeAccount(accountNumber);
    setAccounts(Array.from(signedInUser.getUserAccounts().values()));
  };

  const handleCreateNewAccount = () => {
    setCreateAccount(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.red }}>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={item => item.accountNumber}
        removeClippedSubviews={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateNewAccount}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create new account</Text>
        </View>
      </TouchableOpacity>
      {createAccount && (
        <CreateNewAccount bank={bank} created={setCreateAccount} user={signedInUser} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
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
});

export default AccountScreen;
