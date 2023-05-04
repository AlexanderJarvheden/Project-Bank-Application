// import React from 'react';
// import { FlatList, Text, View } from 'react-native';

// const AccountsList = ({ accounts }) => {
//   return (
//     <FlatList
//       data={accounts}
//       renderItem={({ item }) => (
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
//           <Text style={{ fontSize: 18 }}>{item.name}</Text>
//           <Text style={{ fontSize: 18 }}>{item.balance}</Text>
//         </View>
//       )}
//       keyExtractor={item => item.id.toString()}
//       contentContainerStyle={{ paddingHorizontal: 20 }}
//     />
//   );
// };

// export default AccountsList;

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';

const AccountScreen = () => {
  const accounts = [
    { id: 1, name: 'Checking', balance: 2000 },
    { id: 2, name: 'Savings', balance: 5000 },
    { id: 3, name: 'Investment', balance: 10000 },
  ];

  const renderAccount = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontFamily: FONT.bold,  fontSize: 18 }}>{item.name}</Text>
      <Text style={{ fontFamily: FONT.regular, fontSize: 16 }}>Balance: ${item.balance}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.red }}>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default AccountScreen;