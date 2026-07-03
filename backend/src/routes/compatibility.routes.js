import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    generateCompatibility,
} from "../controllers/compatibility.controller.js";

const router = express.Router();

router.get(
    "/:propertyId",
    verifyToken,
    generateCompatibility
);

export default router;