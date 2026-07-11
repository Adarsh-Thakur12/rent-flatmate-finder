import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    registerUser,
    loginUser,
    getProfileController,
} from "../controllers/auth.controller.js";

import {
    validateRegister,
    validateLogin,
} from "../validators/auth.validator.js";

const router = express.Router();

// ===============================
// Register
// ===============================
router.post(
    "/register",
    validateRegister,
    registerUser
);

// ===============================
// Login
// ===============================
router.post(
    "/login",
    validateLogin,
    loginUser
);

// ===============================
// Get Logged In User Profile
// ===============================
router.get(
    "/profile",
    verifyToken,
    getProfileController
);

export default router;