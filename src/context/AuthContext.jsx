import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [loading, setLoading] = useState(false);

  // const login = async (email, password) => {
  //   setLoading(true);
  //   const { data } = await api.post("/auth/login", { email, password });

  //   localStorage.setItem("token", data.token);
  //   localStorage.setItem("user", JSON.stringify(data));

  //   setUser(data);
  //   setLoading(false);
  // };

  const login = async (email, password) => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("Name", data.name);
      console.log(data);
      setUser(data.user);
    } catch (error) {
      throw error; // VERY IMPORTANT
    } finally {
      setLoading(false); // ALWAYS stop spinner
    }
  };

  // const register = async (name, email, password) => {
  //   setLoading(true);
  //   const { data } = await api.post("/auth/register", {
  //     name,
  //     email,
  //     password,
  //   });

  //   localStorage.setItem("token", data.token);
  //   localStorage.setItem("user", JSON.stringify(data));

  //   setUser(data);
  //   setLoading(false);
  // };

  const register = async (name, email, password) => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("Name", data.name);

      setUser(data.user);
    } catch (error) {
      throw error; // VERY IMPORTANT
    } finally {
      setLoading(false); // ALWAYS stop spinner
    }
  };

  // const logout = () => {
  //   setLoading(true);
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   setLoading(false);
  // };

  const logout = async () => {
    try {
      setLoading(true);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("Name");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
