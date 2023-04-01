import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firebase } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { GoogleAuthProvider } from "firebase/auth";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState("");

  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  // to show user name
  function handleLoginSuccess(user) {
    const displayName = user.displayName;
    dispatch({
      type: actionType.SET_USER_DISPLAY_NAME,
      displayName: displayName,
    });
    dispatch({
      type: actionType.SET_USER,
      user: user,
    });
    onLoginSuccess(displayName);
  }
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      let user = userCredential.user;
      let displayName = user.displayName;
      if (!displayName) {
        displayName = email.split("@")[0];
        await user.updateProfile({ displayName });
      }
      handleLoginSuccess(user);
      navigate("/quiz");
      setTimeout(() => {
        setEmail("");
        setPassword("");
      }, 4000);
    } catch (error) {
      setErrorMessage("Incorrect Username or Password. Try again");
      setTimeout(() => {
        setPassword("");
      }, 4000);
    }
  };

  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("profile");
    provider.addScope("email");
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        handleLoginSuccess(user);
        navigate("/quiz");
      })
      .catch((error) => {
        // handle error
        console.log(error.message);

        setErrorMessage("Login error. Try again");
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome to MyQuiz</h1>
      <div className="shadow border border-gray-200 rounded-md p-7 md:p-10">
        <h1 className="text-2xl md:text-3xl  font-bold mb-4">Login</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-3"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="border rounded-md py-2 px-3 w-full"
              required
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="relative mb-6">
            <label className=" text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
              required
              placeholder="******"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-8 text-gray-500 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-32 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </motion.button>
            <div
              className="flex items-center justify-center border border-blue-500 hover:border-blue-800 rounded-md py-2 px-4 gap-1 cursor-pointer"
              onClick={googleLogin}
            >
              <p className="text-gray-900"> Sign in with</p>{" "}
              <FcGoogle className="text-xl" />
            </div>
          </div>
          <div className="flex gap-5 justify-end items-center pt-4">
            <p className="text-sm text-gray-900 ">
              Don't have account?
              <Link to="/register">
                {" "}
                <span className=" underline hover:text-gray-500 cursor-pointer">
                  Register
                </span>
              </Link>
            </p>

            <Link to="/forgotPassword">
              <p className="text-sm text-gray-900 hover:text-gray-500 cursor-pointer underline">
                Forgot password?
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
