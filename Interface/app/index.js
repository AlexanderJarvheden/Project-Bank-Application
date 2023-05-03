import { ScrollView, TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";
import SignIn from "../components/signin/signIn";
import { COLORS, icons, images, SIZES } from '../constants';
import StockMarketTab from "../components/stockmarket/StockMarket";
import React, { useState } from 'react';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    // Your sign-in logic here

    // Set the sign-in status to true if the sign-in is successful
    setIsSignedIn(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {isSignedIn ? (
        <StockMarketTab />
      ) : (
        <ScrollView style={{ backgroundColor: COLORS.primary }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Stack.Screen options={{ title: "Welcome to your bank", headerStyle: {backgroundColor: COLORS.red}, headerTitleStyle: { fontSize: 30, color: COLORS.white }}} />
            <SignIn onSignIn={handleSignIn}/>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Link href="/details" style={{ color: 'white', fontSize: 16, fontFamily: 'Arial', textAlign: 'center' }}>New user?</Link>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
