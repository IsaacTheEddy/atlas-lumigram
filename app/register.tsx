import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register Page</Text>
      <Link href="./login" replace>
        <Text>Login </Text>
      </Link>
    </View>
  );
}
