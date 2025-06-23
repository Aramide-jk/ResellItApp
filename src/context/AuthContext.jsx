import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("resell-it-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("resell-it-users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(
        "resell-it-user",
        JSON.stringify(userWithoutPassword)
      );
      return true;
    }
    return false;
  };

  const signup = async (userData) => {
    const users = JSON.parse(localStorage.getItem("resell-it-users") || "[]");

    // Check if user already exists
    if (users.find((u) => u.email === userData.email)) {
      return false;
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    users.push(newUser);
    localStorage.setItem("resell-it-users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("resell-it-user", JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("resell-it-user");
  };

  const updateProfile = (userData) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("resell-it-user", JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem("resell-it-users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem("resell-it-users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
