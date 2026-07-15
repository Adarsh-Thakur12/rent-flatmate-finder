import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { generateCompatibility } from "../controllers/compatibility.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("TEST ROUTE");
    res.json({ success: true });
});

router.get(
    "/:propertyId",
    (req, res, next) => {
        console.log("PROPERTY ID:", req.params.propertyId);
        next();
    },
    verifyToken,
    generateCompatibility
);

export default router;