import express from "express";
import upload from "../middleware/upload.middleware.js";

import {
    addProperty,
    getAllProperties,
    getMyProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    uploadPropertyImage,
    markPropertyFilled,
} from "../controllers/property.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { validateProperty } from "../validators/property.validator.js";

const router = express.Router();

router.post(
    "/upload-image",
    verifyToken,
    upload.single("image"),
    uploadPropertyImage
);

// Add Property
router.post(
    "/",
    verifyToken,
    validateProperty,
    addProperty
);

// Get All Properties
router.get(
    "/",
    getAllProperties
);

router.get(
    "/my-properties",
    verifyToken,
    getMyProperties
);

router.put(
    "/:id",
    verifyToken,
    validateProperty,
    updateProperty
);

// Get Property By ID
router.get(
    "/:id",
    getPropertyById,
);
router.patch(
    "/:id/fill",
    verifyToken,
    markPropertyFilled
);
router.delete(
    "/:id",
    verifyToken,
    deleteProperty
);

export default router;