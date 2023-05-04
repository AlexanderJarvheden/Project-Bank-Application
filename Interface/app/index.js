// import { ScrollView, TouchableOpacity, View } from "react-native";
// import { Link, Stack } from "expo-router";
// import SignIn from "../components/signin/signIn";
// import { COLORS, icons, images, SIZES } from '../constants';
// import StockMarketTab from "../components/stockmarket/StockMarket";
// import React, { useState, useEffect } from 'react';
// import AccountsList from '../components/accounts/AccountScreen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import AccountScreen from "../components/accounts/AccountScreen";

// const Tab = createBottomTabNavigator();

// export default function Home() {
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     // Fetch the list of accounts from your database or API
//     const accounts = [
//       { id: 1, name: 'Checking', balance: '$1,000.00' },
//       { id: 2, name: 'Savings', balance: '$5,000.00' },
//       { id: 3, name: 'Credit Card', balance: '$-500.00' },
//     ];
//     setAccounts(accounts);
//   }, []);

//   const handleSignIn = () => {
//     // Your sign-in logic here

//     // Set the sign-in status to true if the sign-in is successful
//     setIsSignedIn(true);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {isSignedIn ? (
//         // <StockMarketTab />
//         <AccountScreen accounts={accounts}>
//           <NavigationContainer>
//             <Tab.Navigator>
//               <Tab.Screen name="Accounts" component={AccountScreen} />
//               {/* <Tab.Screen name="Tab2" component={Screen2} />
//               <Tab.Screen name="Tab3" component={Screen3} />
//               <Tab.Screen name="Tab4" component={Screen4} /> */}
//             </Tab.Navigator>
//           </NavigationContainer>
//         </AccountScreen>
//       ) : (
//         <ScrollView style={{ backgroundColor: COLORS.primary }}>
//           <View style={{ justifyContent: "center", alignItems: "center" }}>
//             <Stack.Screen options={{ title: "Welcome to your bank", headerStyle: { backgroundColor: COLORS.red }, headerTitleStyle: { fontSize: 30, color: COLORS.white } }} />
//             <SignIn onSignIn={handleSignIn} />
//             <View style={{ justifyContent: "center", alignItems: "center" }}>
//               <Link href="/details" style={{ color: 'white', fontSize: 16, fontFamily: 'Arial', textAlign: 'center' }}>New user?</Link>
//             </View>
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// }

import { ScrollView, View, Text, SafeAreaView, RefreshControl } from "react-native";
import {Stack, Link} from 'expo-router'
import SignIn from "../components/signin/signIn";
import { COLORS, SIZES } from '../constants';
import React, { useState, useEffect } from 'react';
import AccountsList from '../components/accounts/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AccountScreen from "../components/accounts/AccountScreen";
import StockMarketTab from "../components/stockmarket/StockMarket";
import Tabs from "../components/jobdetails/tabs/Tabs";


const tabs = ["Accounts", "Transfer", "Stock Market", "Loans", "Sign out"];

const JobDetails = () => {
  // const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch the list of accounts from your database or API
    const accounts = [
      { id: 1, name: 'Checking', balance: '$1,000.00' },
      { id: 2, name: 'Savings', balance: '$5,000.00' },
      { id: 3, name: 'Credit Card', balance: '$-500.00' },
    ];
    setAccounts(accounts);
  }, []);

  const handleSignIn = () => {
    // Your sign-in logic here

    // Set the sign-in status to true if the sign-in is successful
    setIsSignedIn(true);
  };

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Accounts":
        return <AccountScreen
          title="Accounts"
        // points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      // case "Transfer":
      //     return <JobAbout
      //         info={data[0].job_description ?? "No data provided"}
      //     />
      case "Stock Market":
        return <StockMarketTab
          title="Stock Market"
        // points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
      case "Sign out":
        return <SignIn/>
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      {isSignedIn ? (
        <ScrollView showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            {/* <Company
                  companyLogo={data[0].employer_logo}
                  jobTitle={data[0].job_title}
                  companyName={data[0].employer_name}
                  Location={data[0].job_country}
                /> */}

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{ backgroundColor: COLORS.primary }}>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Stack.Screen options={{ title: "Welcome to your bank", headerStyle: { backgroundColor: COLORS.red }, headerTitleStyle: { fontSize: 30, color: COLORS.white } }} />
            <SignIn onSignIn={handleSignIn} />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Link href="/details" style={{ color: 'white', fontSize: 16, fontFamily: 'Arial', textAlign: 'center' }}>New user?</Link>
            </View>
          </View>
        </ScrollView>
      )}

    </SafeAreaView>
  )
}

export default JobDetails

