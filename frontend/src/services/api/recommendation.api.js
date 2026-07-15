import api from "../axios";

// ==========================
// Get AI Recommendations
// ==========================
export const getRecommendations = async () => {

    const response = await api.get(
        "/recommendation"
    );

    return response.data;

};