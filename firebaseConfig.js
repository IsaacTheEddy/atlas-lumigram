// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
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
    measurementId: "G-85G6MJ395L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const storage = getStorage(app)
export const db = getFirestore(app)