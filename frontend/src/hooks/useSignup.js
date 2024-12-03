import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = (navigate) => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullname,
    username,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    // Validate inputs
    const isValid = handleInput({
      fullname,
      username,
      email,
      password,
      confirmPassword,
      gender,
    });

    if (!isValid) return; // Exit if validation fails

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful!");
        navigate("/email");
      } else {
        toast.error(data.message || "Signup failed Please try again");
      }
    } catch (error) {
      toast.error("An error occurred during signup.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInput({
  fullname,
  username,
  email,
  password,
  confirmPassword,
  gender,
}) {
  if (
    !fullname ||
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("Please fill all required fields.");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return false;
  }
  return true; // Validation passed
}
