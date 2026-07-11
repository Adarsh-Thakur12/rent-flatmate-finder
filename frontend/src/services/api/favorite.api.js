import api from "../axios";

// =====================
// Add Favorite
// =====================
export const addFavorite = async (propertyId) => {

    const response = await api.post(
        `/favorite/${propertyId}`
    );

    return response.data;

};

// =====================
// Remove Favorite
// =====================
export const removeFavorite = async (propertyId) => {

    const response = await api.delete(
        `/favorite/${propertyId}`
    );

    return response.data;

};

// =====================
// Get Favorites
// =====================
export const getMyFavorites = async () => {

    const { data } = await api.get("/favorite");

    return data;

};