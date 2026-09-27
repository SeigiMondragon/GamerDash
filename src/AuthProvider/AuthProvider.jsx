import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error in onAuthStateChanged:", error);
        setLoading(false);
        setError(error);
      },
    );
    return () => unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      error,
    }),
    [user, loading, error],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
