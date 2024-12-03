import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import limiter from "../middlewares/rateLimit.js";

const router = express.Router();

router.post("/signup", limiter, signup);
router.post("/login", limiter, login);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);

export default router;
