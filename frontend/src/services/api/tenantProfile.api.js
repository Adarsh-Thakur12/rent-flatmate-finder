import api from "../axios";

// ==========================
// Get Tenant Profile
// ==========================
export const getTenantProfile = async () => {

    const response = await api.get(
        "/profile"
    );

    return response.data;

};

// ==========================
// Create Tenant Profile
// ==========================
export const createTenantProfile = async (profileData) => {

    const response = await api.post(
        "/profile",
        profileData
    );

    return response.data;

};

// ==========================
// Update Tenant Profile
// ==========================
export const updateTenantProfile = async (profileData) => {

    const response = await api.put(
        "/profile",
        profileData
    );

    return response.data;

};