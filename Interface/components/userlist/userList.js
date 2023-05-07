import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserList = ({ bank }) => {
  const userList = Array.from(bank.users.values());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Users:</Text>
      {userList.map((user, index) => (
        <View key={index}>
          <Text>{user.getId()}</Text>
          <Text>{user.getName()}</Text>
          <Text>{user.getPassword()}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default UserList;