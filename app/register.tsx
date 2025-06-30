import { View, Text, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function Page() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const auth = useAuth();

  async function register() {
    try {
      await auth.register(email, password);
      router.replace("./(tabs)/");
    } catch (err) {
      alert("Unable to create account");
    }
  }
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
      {/* Register Text */}
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
          Register
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
          value={password}
          placeholder="Password"
          placeholderTextColor={"white"}
          secureTextEntry={true}
        ></TextInput>
        <Pressable
          style={{
            flex: 0,
            backgroundColor: "#63cfb1",
            height: 50,
            margin: 10,
            borderRadius: 6,
            justifyContent: "center",
          }}
          onPress={register}
        >
          <Text style={{ flex: 0, textAlign: "center", color: "white" }}>
            Create Account
          </Text>
        </Pressable>
        <Link href="./login" replace>
          <Text style={{ flex: 0, textAlign: "center", color: "white" }}>
            Login to existing account
          </Text>
        </Link>
      </View>
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
  textInput: {
    borderWidth: 2,
    borderColor: "#52ac9b",
    margin: 10,
    color: "white",
  },
});
