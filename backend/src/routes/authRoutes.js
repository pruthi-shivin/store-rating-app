import express from "express";
import { signup, login } from "../controllers/authController.js";
import { changePassword } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", verifyToken, changePassword);

export default router;