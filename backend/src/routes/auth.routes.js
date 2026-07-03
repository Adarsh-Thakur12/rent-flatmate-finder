import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    registerUser,
    loginUser,
} from "../controllers/auth.controller.js";

import {
    validateRegister,
    validateLogin,
} from "../validators/auth.validator.js";

const router = express.Router();

console.log("Auth routes loaded");

// Register
router.post(
    "/register",
    validateRegister,
    registerUser
);

// Login
router.post(
    "/login",
    validateLogin,
    loginUser
);

// router.get(
//     "/profile",
//     verifyToken,
//     (req, res) => {

//         return res.json({
//             success: true,
//             message: "Profile fetched successfully",
//             user: req.user,
//         });

//     }
// );

router.get("/profile", (req, res) => {
    console.log("Profile route hit");

    res.json({
        success: true,
        message: "Profile route reached"
    });
});

export default router;