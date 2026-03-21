import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../service/authService.js";
import {api} from "../service/axiosInstance.js";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data.data.user);  // Extract user from nested response
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function login({ email, password }) {
    await loginUser({ email, password });

    await checkAuth(); // Verify session from backend

    toast.success("Logged in successfully!");
  }

  async function register({ username, email, password }) {
    await registerUser({ username, email, password });

    await checkAuth(); // Verify session from backend

    toast.success("Account created successfully!");
  }

  async function logout() {
    setUser(null);
    toast.success("Logged out successfully!");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;