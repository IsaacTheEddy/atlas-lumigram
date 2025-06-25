import { View, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  return (
    <View style={styles.pageView}>
      {/* Atlas School */}
      <View style={{ flex: 2, justifyContent: "flex-end" }}>
        <Text
          style={{
            flex: 0,
            fontSize: 50,
            color: "white",
            textAlign: "center",
          }}
        >
          Atlas
        </Text>
        <Text
          style={{
            flex: 0,
            fontSize: 50,
            color: "white",
            textAlign: "center",
          }}
        >
          School
        </Text>
      </View>
      {/* Login Text */}
      <View style={{ flex: 0 }}>
        <Text
          style={{
            flex: 0,
            fontSize: 25,
            color: "white",
            textAlign: "center",
            marginVertical: 25,
          }}
        >
          Login
        </Text>
      </View>
      {/* Input Boxes */}
      <View
        style={{
          flex: 3,
          flexShrink: 1,
          height: 50,
          width: "100%",
          marginHorizontal: 100,
        }}
      >
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor={"white"}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePassword}
          value={email}
          placeholder="Password"
          placeholderTextColor={"white"}
        ></TextInput>
        <Pressable
          style={{ flex: 0, backgroundColor: "red" }}
          onPress={() => {
            router.push("./(tabs)/");
          }}
        >
          <Text>Sign In</Text>
        </Pressable>
        <Link href="./register" replace>
          <Text>Create a New Acoount</Text>
        </Link>
      </View>
      {/* <View style={{ flex: 2, backgroundColor: "blue" }}>
       
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000039",
  },
  textInput: { borderWidth: 2, borderColor: "#52ac9b", margin: 10 },
});
