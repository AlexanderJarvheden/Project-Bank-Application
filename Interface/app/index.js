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
          <Stack.Screen options={{ title: "Sign in"}} style={{backgroundColor: COLORS.secondary}} />
          {/* Use the `Link` component to enable optimized client-side routing. */}
          <SignIn/>
          <Link href="/details">Go to Details</Link>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}