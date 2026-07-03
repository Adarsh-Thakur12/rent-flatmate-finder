import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    generateRecommendations,
} from "../controllers/recommendation.controller.js";

const router = express.Router();

// =====================================
// AI Property Recommendations
// =====================================
router.get(
    "/",
    verifyToken,
    generateRecommendations
);

export default router;