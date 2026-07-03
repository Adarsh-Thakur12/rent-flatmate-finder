import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    sendMessage,
    getConversation,
} from "../controllers/chat.controller.js";

const router = express.Router();

// ======================================
// Send Message
// POST /api/chat/:bookingId
// ======================================
router.post(
    "/:bookingId",
    verifyToken,
    sendMessage
);

// ======================================
// Get Conversation
// GET /api/chat/:bookingId
// ======================================
router.get(
    "/:bookingId",
    verifyToken,
    getConversation
);

export default router;