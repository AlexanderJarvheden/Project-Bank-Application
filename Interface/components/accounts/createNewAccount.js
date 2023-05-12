// // CreateNewAccount.js

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { COLORS } from '../../constants';
// import { Picker } from '@react-native-picker/picker';
// import Account from '../../src/Account';
// import Bank from '../../src/Bank';

// const CreateNewAccount = ({ bank, created, user }) => {
//     const [accountNumber, setAccountNumber] = useState('');
//     const [accountType, setAccountType] = useState('');
//     const [name, setName] = useState('');

//     const handleCreateNewAccount = async () => {
//         const newAccount = await bank.createAccount(accountType, user);
//         setAccountNumber(newAccount.getAccountNumber());
//         Alert.alert('Successful!', 'Your new account ' + name + " has the account number: " + bank.getClearingNumber() + "-" + newAccount.getAccountNumber());
//         created(false);  // Set to false instead of true
//     };



//     return (
//         <View style={styles.container}>
//             <Picker
//                 style={styles.picker}
//                 selectedValue={accountType}
//                 onValueChange={(itemValue) => setAccountType(itemValue)}
//             >
//                 <Picker.Item label="Select an account type" value="" />
//                 {Array.from(bank.accountTypes.keys()).map((accountType) => (
//                     <Picker.Item label={accountType} value={accountType} key={accountType} />
//                 ))}
//             </Picker>
//             <TextInput
//                 style={{ ...styles.input, color: 'white' }}
//                 placeholder="Name"
//                 onChangeText={setName}
//                 value={name}
//                 autoCapitalize="words"
//                 keyboardType="default"
//             />
//             <TouchableOpacity style={styles.button} onPress={handleCreateNewAccount}>
//                 <View style={styles.buttonContainer}>
//                     <Text style={styles.buttonText}>Create account</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     picker: {
//         width: '100%',
//         height: 50,
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: COLORS.grey,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//         width: '100%',
//     },
//     button: {
//         width: '100%',
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     buttonContainer: {
//         backgroundColor: COLORS.red,
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 10,
//         elevation: 3,
//     },
//     buttonText: {
//         color: COLORS.lightWhite,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });

// export default CreateNewAccount;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import { Picker } from '@react-native-picker/picker';
import Account from '../../src/Account';
import Bank from '../../src/Bank';

const CreateNewAccount = ({ bank, created, user }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [name, setName] = useState('');
    const [pickerOpen, setPickerOpen] = useState(false);

    const handleCreateNewAccount = async () => {
        const newAccount = await bank.createAccount(accountType, user);
        setAccountNumber(newAccount.getAccountNumber());
        Alert.alert('Successful!', 'Your new account ' + name + " has the account number: " + bank.getClearingNumber() + "-" + newAccount.getAccountNumber());
        created(false);
    };

    const handlePickerPress = () => {
        setPickerOpen(!pickerOpen);
    };

    const handlePickerSelect = (itemValue) => {
        setPickerOpen(false);
        setAccountType(itemValue);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.pickerWrapper} onPress={handlePickerPress}>
                <Text style={styles.pickerLabel}>{accountType || "Select an account type"}</Text>
                {pickerOpen && (
                    <Picker
                        style={styles.picker}
                        selectedValue={accountType}
                        onValueChange={handlePickerSelect}
                        itemStyle={styles.pickerItem}
                    >
                        {Array.from(bank.accountTypes.keys()).map((accountType) => (
                            <Picker.Item label={accountType} value={accountType} key={accountType} />
                        ))}
                    </Picker>
                )}
            </TouchableOpacity>
            <TextInput
                style={{ ...styles.input, color: 'white' }}
                placeholder="Name"
                placeholderTextColor={'white'}
                onChangeText={setName}
                value={name}
                autoCapitalize="words"
                keyboardType="default"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateNewAccount}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Create account</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    pickerWrapper: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.grey,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    pickerLabel: {
        color: 'black',
    },
    picker: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    pickerItem: {
        paddingVertical: 10,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
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

export default CreateNewAccount;
