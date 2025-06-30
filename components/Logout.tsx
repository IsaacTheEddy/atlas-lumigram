import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Pressable } from "react-native";
import { useAuth } from "./AuthProvider";

export default function LogOut() {
  const router = useRouter();
  const auth = useAuth();

  async function logout() {
    await auth.logout();
    console.log("Logged out ", auth.user);
    router.replace("../login");
  }
  return (
    <Pressable onPress={logout}>
      <Ionicons name="log-out-outline" size={24} style={{ marginRight: 16 }} />
    </Pressable>
  );
}
