import {
    addFavoriteService,
    removeFavoriteService,
    getMyFavoritesService,
} from "../services/favorite.service.js";

// =======================
// Add Favorite
// =======================
export const addFavorite = async (req, res) => {

    try {

        const result = await addFavoriteService(
            req.user.id,
            req.params.propertyId
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

// =======================
// Remove Favorite
// =======================
export const removeFavorite = async (req, res) => {

    try {

        const result = await removeFavoriteService(
            req.user.id,
            req.params.propertyId
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

// =======================
// Get My Favorites
// =======================
export const getMyFavorites = async (req, res) => {

    try {

        const result = await getMyFavoritesService(
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