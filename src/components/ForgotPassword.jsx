import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      setSuccessMessage("A password reset link sent to your email address");
      setEmail("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Forgot Password</h1>
      <div className="shadow border border-gray-200 rounded-md p-7 md:p-10">
        <form onSubmit={handleResetPassword}>
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
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
              onChange={handleEmailChange}
              className="border rounded-md py-2 px-3 w-full"
              required
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
            <Link to="/">
              <button className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outine">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
