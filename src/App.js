import React, { useEffect, useState } from "react";
import { firebase } from "./utils/firebase";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { AnimatePresence } from "framer-motion";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

  function handleLoginSuccess(displayName) {
    setDisplayName(displayName);
  }

  // to check if user is logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route
          exact
          path="/"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/quiz"
          element={
            loggedIn ? <Quiz displayName={displayName} /> : <Navigate to="/" />
          }
        />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
