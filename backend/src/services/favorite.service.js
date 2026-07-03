import Favorite from "../models/Favorite.js";
import Property from "../models/Property.js";

// =======================
// Add Favorite
// =======================
export const addFavoriteService = async (
    userId,
    propertyId
) => {

    try {

        const property = await Property.findById(propertyId);

        if (!property) {

            return {
                success: false,
                statusCode: 404,
                message: "Property not found",
            };

        }

        const alreadyExists = await Favorite.findOne({
            user: userId,
            property: propertyId,
        });

        if (alreadyExists) {

            return {
                success: false,
                statusCode: 400,
                message: "Property already added to favorites",
            };

        }

        const favorite = await Favorite.create({
            user: userId,
            property: propertyId,
        });

        return {
            success: true,
            statusCode: 201,
            message: "Property added to favorites",
            favorite,
        };

    } catch (error) {
        throw error;
    }

};

// =======================
// Remove Favorite
// =======================
export const removeFavoriteService = async (
    userId,
    propertyId
) => {

    try {

        const favorite = await Favorite.findOne({
            user: userId,
            property: propertyId,
        });

        if (!favorite) {

            return {
                success: false,
                statusCode: 404,
                message: "Favorite not found",
            };

        }

        await Favorite.findByIdAndDelete(favorite._id);

        return {
            success: true,
            statusCode: 200,
            message: "Property removed from favorites",
        };

    } catch (error) {
        throw error;
    }

};

// =======================
// Get My Favorites
// =======================
export const getMyFavoritesService = async (userId) => {

    try {

        const favorites = await Favorite.find({
            user: userId,
        }).populate({
            path: "property",
            populate: {
                path: "owner",
                select: "name email mobile",
            },
        });

        return {
            success: true,
            statusCode: 200,
            count: favorites.length,
            favorites,
        };

    } catch (error) {
        throw error;
    }

};