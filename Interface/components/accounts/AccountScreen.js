import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import CreateNewAccount from './createNewAccount';

const AccountScreen = ({ bank, signedInUser }) => {
  const [createAccount, setCreateAccount] = useState(false);

  const accounts = [
    { id: 1, name: 'Checking', balance: 2000 },
    { id: 2, name: 'Savings', balance: 5000 },
    { id: 3, name: 'Investment', balance: 10000 },
  ];

  const renderAccount = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontFamily: FONT.bold, fontSize: 18 }}>{item.name}</Text>
      <Text style={{ fontFamily: FONT.regular, fontSize: 16 }}>Balance: ${item.balance}</Text>
    </View>
  );

  const handleCreateNewAccount = () => (
    setCreateAccount(true)
  );


  return (
    <View style={{ flex: 1, backgroundColor: COLORS.red }}>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={item => item.id.toString()}
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