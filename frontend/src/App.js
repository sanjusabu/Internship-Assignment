import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Tasks from "./components/Tasks/Tasks";
import { AuthContext } from "../src/context/authcontext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setuserId] = useState("");

  const login = useCallback((uid) => {
    localStorage.setItem("userid", uid);
    setIsLoggedIn(true);
    setuserId(localStorage.getItem("userid"));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
  }, []);

  useEffect(() => {
    if (localStorage.hasOwnProperty("userid")) {
      setuserId(localStorage.getItem("userid"));
      setIsLoggedIn(true);
    }
  }, []);

  let routes;
  if (!isLoggedIn) {
    routes = (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Register />}></Route>
        </Routes>
      </Router>
    );
  } else {
    routes = (
      <Router>
        <Routes>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/" element={<Tasks />}></Route>
        </Routes>
      </Router>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <main>{routes}</main>
    </AuthContext.Provider>
  );
}
export default App;
