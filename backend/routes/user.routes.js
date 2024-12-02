import e from "express";
import { searchUser } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = e.Router();

router.get("/", verifyToken, searchUser);

export default router;
