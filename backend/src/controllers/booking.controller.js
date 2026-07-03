import {
    createBookingService,
    getMyBookingsService,
    getPropertyBookingsService,
    acceptBookingService,
    rejectBookingService,
} from "../services/booking.service.js";

// ======================
// Create Booking
// ======================
export const createBooking = async (req, res) => {

    try {

        const result = await createBookingService(
            req.params.propertyId,
            req.user.id,
            req.user.role
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

// ======================
// Get My Bookings
// ======================
export const getMyBookings = async (req, res) => {

    try {

        const result = await getMyBookingsService(
            req.user.id
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

// ======================
// Get Property Bookings
// ======================
export const getPropertyBookings = async (req, res) => {

    try {

        const result = await getPropertyBookingsService(
            req.user.id
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

// ======================
// Accept Booking
// ======================
export const acceptBooking = async (req, res) => {

    try {

        const result = await acceptBookingService(
            req.params.bookingId,
            req.user.id,
            req.user.role
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

// ======================
// Reject Booking
// ======================
export const rejectBooking = async (req, res) => {

    try {

        const result = await rejectBookingService(
            req.params.bookingId,
            req.user.id,
            req.user.role
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};