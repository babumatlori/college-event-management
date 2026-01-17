import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

//Load saved user
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedToken = localStorage.getItem("token");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedToken) {
      setToken(savedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }

    setLoading(false);

  }, []);

//Persist changes to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }

    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [currentUser, token]);

//REGISTER user
  const register = async ({ name, email, password, role }) => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("Registration successful!");
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

//LOGIN user
  const login = async ({ email, password }) => {
    try{
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user} = res.data;
      setCurrentUser(user);
      setToken(token);

      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("token", token);


      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return user;

    }catch(err){
      throw new Error(err.response?.data?.message || "Login failed");
    }
  }

//LOGOUT
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, token, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
