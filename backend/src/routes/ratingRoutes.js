import express from "express";
import {
  submitRating,
  updateRating,
} from "../controllers/ratingController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, submitRating);
router.put("/", verifyToken, updateRating);

export default router;