import express from "express";
import {
  createUser,
  createStore,
  getDashboardStats,
  getUsersList,
  getStoresList,
} from "../controllers/adminController.js";

import {
  verifyToken,
  allowRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-user",
  verifyToken,
  allowRoles("admin"),
  createUser
);

router.post(
  "/create-store",
  verifyToken,
  allowRoles("admin"),
  createStore
);

router.get(
  "/dashboard",
  verifyToken,
  allowRoles("admin"),
  getDashboardStats
);

router.get(
  "/users",
  verifyToken,
  allowRoles("admin"),
  getUsersList
);

router.get(
  "/stores",
  verifyToken,
  allowRoles("admin"),
  getStoresList
);

export default router;