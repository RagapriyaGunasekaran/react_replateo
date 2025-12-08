import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Detect login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Login
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Register
  const register = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }

    // Save user to Firestore
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      name,
      createdAt: serverTimestamp(),
    });

    return cred;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
