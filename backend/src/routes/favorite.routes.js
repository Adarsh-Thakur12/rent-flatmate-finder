import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    addFavorite,
    removeFavorite,
    getMyFavorites,
} from "../controllers/favorite.controller.js";

const router = express.Router();

// Add Property to Favorites
router.post(
    "/:propertyId",
    verifyToken,
    addFavorite
);

// Remove Property from Favorites
router.delete(
    "/:propertyId",
    verifyToken,
    removeFavorite
);

// Get My Favorites
router.get(
    "/",
    verifyToken,
    getMyFavorites
);

export default router;