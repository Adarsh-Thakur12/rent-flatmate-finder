import api from "../axios";

export const getCompatibility = async (propertyId) => {

    const response = await api.get(
        `/compatibility/${propertyId}`
    );

    return response.data;

};