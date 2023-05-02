import { ScrollView, TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";
import SignIn from "../components/signin/signIn";
import { COLORS, icons, images, SIZES } from '../constants';

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center" }}>
      {/* Use the `Screen` component to configure the layout. */}
      <ScrollView>
        <TouchableOpacity>
          <Stack.Screen options={{ title: "Welcome to your bank", headerStyle: {backgroundColor: COLORS.red}, headerTitleStyle: { fontSize: 30, color: COLORS.white }}} />
          {/* Use the `Link` component to enable optimized client-side routing. */}
          <SignIn/>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Link href="/details" style={{ color: 'white', fontSize: 16, fontFamily: 'Arial', textAlign: 'center' }}>New user?</Link>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}