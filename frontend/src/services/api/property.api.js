import api from "../axios";

// ==========================
// Get All Properties
// ==========================
export const getAllProperties = async (query = "") => {

    const response = await api.get(`/property?${query}`);

    return response.data;

};

// ==========================
// Get Property By ID
// ==========================
export const getPropertyById = async (id) => {

    const response = await api.get(`/property/${id}`);

    return response.data;

};

// ==========================
// Add Property
// ==========================
export const addProperty = async (propertyData) => {

    const response = await api.post(
        "/property",
        propertyData
    );

    return response.data;

};

// ==========================
// Upload Property Image
// ==========================
export const uploadPropertyImage = async (formData) => {

    const response = await api.post(
        "/property/upload-image",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};

// ==========================
// Get My Properties
// ==========================
export const getMyProperties = async () => {

    const response = await api.get(
        "/property/my-properties"
    );

    return response.data;

};

// ==========================
// Delete Property
// ==========================
export const deleteProperty = async (id) => {

    const response = await api.delete(
        `/property/${id}`
    );

    return response.data;

};

// ==========================
// Mark Property Filled
// ==========================
export const markPropertyFilled = async (id) => {

    const response = await api.patch(
        `/property/${id}/fill`
    );

    return response.data;

};
export const updateProperty = async (id, propertyData) => {
    const response = await api.put(
        `/property/${id}`,
        propertyData
    );

    return response.data;
};