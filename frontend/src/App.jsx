import { useState } from "react";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
function App() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Home />
      </div>
    </>
  );
}

export default App;
