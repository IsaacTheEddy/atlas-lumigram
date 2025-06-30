import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
const AuthContext = createContext<AuthContextType>({ register, logout, logIn });

type AuthContextType = {
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  user?: User | null;
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);

function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function logIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

function logout() {
  return auth.signOut();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, logout, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}
