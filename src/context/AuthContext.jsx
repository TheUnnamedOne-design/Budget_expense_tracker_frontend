import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const backendUrl = 'http://localhost:4000';  // Your backend API base URL

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("et_token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("et_user") || "null"));

  async function login(email, password) {
    try {
      const response = await fetch(`${backendUrl}/apiauthlogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();

      if (res.ok) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem("et_token", res.token);
        localStorage.setItem("et_user", JSON.stringify(res.user));
        return { ok: true };
      }
      return res;
    } catch (error) {
      return { ok: false, message: "Network error" };
    }
  }

  async function signup(name, email, password) {
    try {
      const response = await fetch(`${backendUrl}/apiauthsignup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const res = await response.json();
      return res;
    } catch (error) {
      return { ok: false, message: "Network error" };
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("et_token");
    localStorage.removeItem("et_user");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
