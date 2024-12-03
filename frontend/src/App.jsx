import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import VerifyEmail from "./pages/email/VerifyEmail.jsx";
function App() {
  const { authState } = useAuthContext();
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authState ? <Home /> : <Navigate to={"/login"} />}></Route>
          <Route
            path="/login"
            element={authState ? <Navigate to={"/"} /> : <Login />}></Route>
          <Route
            path="/signup"
            element={authState ? <Navigate to={"/"} /> : <Signup />}></Route>
          <Route path="/email" element={<VerifyEmail />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
