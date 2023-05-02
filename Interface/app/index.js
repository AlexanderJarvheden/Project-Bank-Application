import { View } from "react-native";
import { Link, Stack } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Use the `Screen` component to configure the layout. */}
      <Stack.Screen options={{ title: "Sign in" }} />
      {/* Use the `Link` component to enable optimized client-side routing. */}
      <Link href="/details">Go to Details</Link>
    </View>
  );
}