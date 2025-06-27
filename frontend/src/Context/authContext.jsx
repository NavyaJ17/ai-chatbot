import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // let params = useParams();
  // console.log(params);
  const [user, setUser] = useState({});

  const fetchData = async () => {
    try {
      let res = await axios.get("https://ai-chatbot-7cri.onrender.com/user", {
        withCredentials: true,
      });
      console.log("Fetched user data:", res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // setUser(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const login = async () => {
    await fetchData();
  };

  const logout = async () => {
    await fetchData();
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
