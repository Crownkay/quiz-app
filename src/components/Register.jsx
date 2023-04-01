import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../utils/firebase";
import { motion } from "framer-motion";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Register = (handleUserAuth) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("User registered:", user);
      setRegistered(true);
      navigate("/quiz");
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }, 1000);
      setError(null);
    } catch (error) {
      setError("User already exist");
      setTimeout(() => {
        setPassword("");
      }, 4000);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await firebase.auth().signInWithPopup(provider);
      console.log("Used signed up with Google:", user.uid);
      setRegistered(true);
      setError(null);
      navigate("/quiz");
    } catch {
      console.error("Error signing up with Google:", error);
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="items-center text-3xl font-bold mb-8">Register</h1>
      {registered ? (
        <p className="text-green-500 mb-4">Registration successful!</p>
      ) : (
        <form
          className="bg-white shadow-md border rounded-md px-8 mx-10  pt-6 pb-8 mb-4"
          onSubmit={handleRegistration}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={fullName}
                name={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </label>

            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                value={email}
                name={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              className="relative text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8 text-gray-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </label>

            <label
              className="relative text-gray-700 font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Comfirm Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-8 text-gray-500 focus:outline-none"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </label>
            {error && <p className="text-red-500 block text-sm">{error}</p>}
          </div>
          <div className="flex items-center gap-5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </motion.button>

            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center border border-blue-500 hover:border-blue-800 rounded-md py-2 px-2 gap-1 cursor-pointer"
              onClick={handleGoogleSignUp}
            >
              <p className="text-gray-900 text-sm"> Sign up with</p>{" "}
              <FcGoogle className="text-xl" />
            </motion.div>
          </div>
          <p className="pt-4 text-base text-gray-900">
            Already have account?{" "}
            <motion.span
              whileTap={{ scale: 0.9 }}
              className="underline hover:text-black"
            >
              {" "}
              <Link to="/"> Login</Link>
            </motion.span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
