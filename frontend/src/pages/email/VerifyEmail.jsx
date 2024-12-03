import React from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-30 shadow-md p-6">
      <div className="flex flex-col items-center justify-center w-full text-center px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-lime-600 mb-4">
          Email Verification Sent!
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          A verification link has been sent to the email address you registered
          with. Please check your inbox (and spam folder) to verify your
          account.
        </p>
        <p className="text-gray-300 text-lg">
          Once verified, you can proceed to{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:text-red-700 font-medium underline transition">
            Login
          </Link>
          .
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="bg-lime-600 hover:bg-lime-500 text-white py-2 px-6 rounded-lg transition shadow-md">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
