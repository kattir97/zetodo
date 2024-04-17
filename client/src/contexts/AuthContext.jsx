import { createContext, useEffect, useState } from "react";
import { authApi } from "../apis/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (!loggedInUser) {
      // Generate a new guest account
      const guestUser = {
        id: 44, // Generate a unique ID for the guest account
        username: "guest", // Generate a unique username for the guest account
        salt: "", // No need to generate a salt for the guest account
        hash: "", // No need to generate a hash for the guest account
        email: "guest@email.com", // Generate a unique email address for the guest account
      };

      login(guestUser);
      setUser(guestUser);
      console.log(user);
    } else {
      const foundUser = JSON.parse(loggedInUser);
      console.log("found user:", foundUser);
      setUser(foundUser);
    }
  }, []);

  const register = async (newUser) => {
    try {
      const response = await authApi.post("/register", newUser);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  const login = async (user) => {
    console.log(user);
    const response = await authApi.post("/login", user, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    return response;
  };

  const logout = async () => {
    await authApi.get("/logout");
  };

  const data = {
    register,
    login,
    user,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
