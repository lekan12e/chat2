import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useAuthContext();

  const login = async (username, password) => {
    // Validate inputs
    const isValid = handleInput(username, password);

    if (!isValid) return; // Exit if validation fails

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("login successful!");
        localStorage.setItem("user", JSON.stringify(data));
        setAuthState(data);
      } else {
        toast.error(data.message || "login failed Please try again");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

function handleInput(username, password) {
  if (!username || !password) {
    toast.error("Please fill all required fields.");
    return false;
  }
  return true; // Validation passed
}
