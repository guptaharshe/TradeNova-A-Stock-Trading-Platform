import { createContext, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Use lazy initializer to avoid setState in effect
  const [user, setUser] = useState(() => {
    return authService.getCurrentUser();
  });
  // loading is always false since user is initialized synchronously
  const loading = false;

  // Login with API call
  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    return response;
  };

  // Register with API call
  const register = async (name, email, password) => {
    const response = await authService.register(name, email, password);
    setUser(response.user);
    return response;
  };

  // Set user directly (for cases where API already called)
  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && authService.isAuthenticated();
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      setUserData,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
