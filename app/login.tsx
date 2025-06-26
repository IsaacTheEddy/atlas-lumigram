import { View, Text, Pressable, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function Page() {
  const router = useRouter();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB57_XPj6XFTkv1hbB1G2XpeQRuOYP_irY",
    authDomain: "lumigram-9d2ae.firebaseapp.com",
    projectId: "lumigram-9d2ae",
    storageBucket: "lumigram-9d2ae.firebasestorage.app",
    messagingSenderId: "1008387069763",
    appId: "1:1008387069763:web:f47ea40378746594d301f6",
    measurementId: "G-85G6MJ395L",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

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
          onPress={() =>
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                router.push("./(tabs)/");
              })
              .catch((error) => {
                const err = console.error(error);
              })
          }
        >
          <Text style={{ flex: 0, textAlign: "center", color: "white" }}>
            Sign In
          </Text>
        </Pressable>
        <Link href="./register" replace>
          <Text style={{ flex: 0, textAlign: "center", color: "white" }}>
            Create a New Acoount
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
