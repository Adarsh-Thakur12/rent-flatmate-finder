import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    createTenantProfile,
    getTenantProfile,
    updateTenantProfile,
} from "../controllers/tenantProfile.controller.js";

const router = express.Router();

// =======================
// Create Tenant Profile
// =======================
router.post(
    "/",
    verifyToken,
    createTenantProfile
);

// =======================
// Get My Tenant Profile
// =======================
router.get(
    "/",
    verifyToken,
    getTenantProfile
);

// =======================
// Update Tenant Profile
// =======================
router.put(
    "/",
    verifyToken,
    updateTenantProfile
);

export default router;