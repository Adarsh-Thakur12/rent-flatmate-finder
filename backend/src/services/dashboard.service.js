import Property from "../models/Property.js";
import Booking from "../models/Booking.js";
import Favorite from "../models/Favorite.js";

export const getOwnerDashboardService = async (ownerId) => {

    try {

        // Total Properties
        const totalProperties = await Property.countDocuments({
            owner: ownerId,
        });

        // Get owner's property IDs
        const properties = await Property.find({
            owner: ownerId,
        }).select("_id");

        const propertyIds = properties.map(
            (property) => property._id
        );

        // Booking Counts
        const totalBookings = await Booking.countDocuments({
            property: { $in: propertyIds },
        });

        const pendingBookings = await Booking.countDocuments({
            property: { $in: propertyIds },
            status: "Pending",
        });

        const acceptedBookings = await Booking.countDocuments({
            property: { $in: propertyIds },
            status: "Accepted",
        });

        const rejectedBookings = await Booking.countDocuments({
            property: { $in: propertyIds },
            status: "Rejected",
        });

        // Favorite Count
        const totalFavorites = await Favorite.countDocuments({
            property: { $in: propertyIds },
        });

        return {
            success: true,
            statusCode: 200,
            dashboard: {
                totalProperties,
                totalBookings,
                pendingBookings,
                acceptedBookings,
                rejectedBookings,
                totalFavorites,
            },
        };

    } catch (error) {

        throw error;

    }

};