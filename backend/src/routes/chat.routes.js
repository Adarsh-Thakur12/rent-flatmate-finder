import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    sendMessage,
    getMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

// ======================
// Get Chat History
// ======================
router.get(
    "/:bookingId",
    verifyToken,
    getMessages
);

// ======================
// Send Message
// ======================
router.post(
    "/:bookingId",
    verifyToken,
    sendMessage
);

export default router;