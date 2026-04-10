import express from "express";
import { getOwnerDashboard } from "../controllers/ownerController.js";
import {
  verifyToken,
  allowRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  allowRoles("owner"),
  getOwnerDashboard
);

export default router;