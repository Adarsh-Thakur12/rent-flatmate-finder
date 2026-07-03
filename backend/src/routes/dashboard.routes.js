import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getOwnerDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
    "/owner",
    verifyToken,
    getOwnerDashboard
);

export default router;