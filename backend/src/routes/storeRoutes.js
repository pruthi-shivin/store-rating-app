import express from "express";
import { getAllStores } from "../controllers/storeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllStores);

export default router;