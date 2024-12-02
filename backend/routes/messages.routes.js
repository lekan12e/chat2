import e from "express";
import { getMessages, send } from "../controllers/message.contoller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = e.Router();

router.get("/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, send);

export default router;
