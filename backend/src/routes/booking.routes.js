import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
    createBooking,
    getMyBookings,
    getPropertyBookings,
     acceptBooking,
    rejectBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

// ======================
// Create Booking
// ======================
router.patch(
    "/:bookingId/accept",
    verifyToken,
    acceptBooking
);

router.patch(
    "/:bookingId/reject",
    verifyToken,
    rejectBooking
);

router.post(
    "/:propertyId",
    verifyToken,
    createBooking
);

// ======================
// Get My Bookings (Tenant)
// ======================
router.get(
    "/my-bookings",
    verifyToken,
    getMyBookings
);

// ======================
// Get Property Bookings (Owner)
// ======================
router.get(
    "/property-bookings",
    verifyToken,
    getPropertyBookings
);

export default router;