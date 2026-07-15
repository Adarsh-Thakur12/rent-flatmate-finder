import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import User from "../models/User.js";
import Compatibility from "../models/Compatibility.js";
import { sendMail } from "../utils/sendMail.js";

// ======================
// Create Booking
// ======================
// ======================
// Create Booking
// ======================
export const createBookingService = async (
    propertyId,
    tenantId,
    role
) => {

    try {

        // Only tenant can book
        if (role !== "tenant") {
            return {
                success: false,
                statusCode: 403,
                message: "Only tenants can book properties.",
            };
        }

        // Check property exists
        const property = await Property.findById(propertyId);

        if (!property) {
            return {
                success: false,
                statusCode: 404,
                message: "Property not found",
            };
        }

        // Owner cannot book own property
        if (property.owner.toString() === tenantId) {
            return {
                success: false,
                statusCode: 400,
                message: "You cannot book your own property",
            };
        }

        // Prevent duplicate booking
        const existingBooking = await Booking.findOne({
            property: propertyId,
            tenant: tenantId,
        });

        if (existingBooking) {
            return {
                success: false,
                statusCode: 400,
                message: "Booking request already sent",
            };
        }

        // Create Booking
        const booking = await Booking.create({
            property: propertyId,
            tenant: tenantId,
            owner: property.owner,
        });

        // =====================================
        // Notify Owner if Compatibility >= 80
        // =====================================
        try {

            const compatibility = await Compatibility.findOne({
                tenant: tenantId,
                property: propertyId,
            });

            const threshold = Number(
                process.env.HIGH_COMPATIBILITY_SCORE || 80
            );

            if (
                compatibility &&
                compatibility.score >= threshold
            ) {

                const owner = await User.findById(property.owner);
                const tenant = await User.findById(tenantId);

                await sendMail(

                    owner.email,

                    "High Compatibility Tenant Interested",

                    `
                    <h2>Hello ${owner.name},</h2>

                    <p>
                        A tenant with a compatibility score of
                        <strong>${compatibility.score}</strong>
                        has shown interest in your property.
                    </p>

                    <p>
                        <strong>Tenant Name:</strong>
                        ${tenant.name}
                    </p>

                    <p>
                        Please login and review the booking request.
                    </p>
                    `

                );

            }

        } catch (mailError) {

            console.log(
                "Owner Email Error:",
                mailError.message
            );

        }

        return {
            success: true,
            statusCode: 201,
            message: "Booking request sent successfully",
            booking,
        };

    } catch (error) {

        throw error;

    }

};

// ======================
// Get My Bookings
// ======================
export const getMyBookingsService = async (tenantId) => {

    try {

        console.log("Tenant ID:", tenantId);

        const bookings = await Booking.find({
            tenant: tenantId,
        })
            .populate("property")
            .populate("owner", "name email mobile");

        console.log("My Bookings:", bookings);

        return {
            success: true,
            statusCode: 200,
            count: bookings.length,
            bookings,
        };

    } catch (error) {
        throw error;
    }
};

// ======================
// Get Property Bookings
// ======================
export const getPropertyBookingsService = async (ownerId) => {
    try {

        console.log("Logged in Owner:", ownerId);

        const properties = await Property.find({ owner: ownerId });

        console.log("Properties:", properties);

        const propertyIds = properties.map(property => property._id);

        console.log("Property IDs:", propertyIds);

        const bookings = await Booking.find({
            property: { $in: propertyIds }
        })
        .populate("tenant", "name email mobile")
        .populate("property");

        console.log("Bookings:", bookings);

        return {
            success: true,
            statusCode: 200,
            count: bookings.length,
            bookings,
        };

    } catch (error) {
        throw error;
    }
};

// ======================
// Accept Booking
// ======================
export const acceptBookingService = async (
    bookingId,
    ownerId,
    role
) => {

    try {
       

        if (role !== "owner") {
            return {
                success: false,
                statusCode: 403,
                message: "Only owners can accept bookings.",
            };
        }

        const booking = await Booking.findById(bookingId);

        console.log("Booking Owner:", booking.owner.toString());
        console.log("Logged in Owner:", ownerId);
        console.log("Role:", role);

        if (!booking) {
            return {
                success: false,
                statusCode: 404,
                message: "Booking not found",
            };
        }

        if (booking.owner.toString() !== ownerId) {
            return {
                success: false,
                statusCode: 403,
                message: "Unauthorized",
            };
        }

        if (booking.status !== "Pending") {
            return {
                success: false,
                statusCode: 400,
                message: "Booking has already been processed",
            };
        }

        booking.status = "Accepted";

        await booking.save();

        // Reject all other pending bookings
        await Booking.updateMany(
            {
                property: booking.property,
                _id: { $ne: booking._id },
                status: "Pending",
            },
            {
                $set: {
                    status: "Rejected",
                },
            }
        );

        return {
            success: true,
            statusCode: 200,
            message: "Booking accepted successfully",
            booking,
        };

    } catch (error) {
        throw error;
    }
};

// ======================
// Reject Booking
// ======================
export const rejectBookingService = async (
    bookingId,
    ownerId,
    role
) => {

    try {

        if (role !== "owner") {
            return {
                success: false,
                statusCode: 403,
                message: "Only owners can reject bookings.",
            };
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return {
                success: false,
                statusCode: 404,
                message: "Booking not found",
            };
        }

        if (booking.owner.toString() !== ownerId) {
            return {
                success: false,
                statusCode: 403,
                message: "Unauthorized",
            };
        }

        if (booking.status !== "Pending") {
            return {
                success: false,
                statusCode: 400,
                message: "Booking has already been processed",
            };
        }

        booking.status = "Rejected";

        await booking.save();

        return {
            success: true,
            statusCode: 200,
            message: "Booking rejected successfully",
            booking,
        };

    } catch (error) {
        throw error;
    }
};