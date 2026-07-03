import TenantProfile from "../models/TenantProfile.js";

// =======================
// Create Tenant Profile
// =======================
export const createTenantProfileService = async (
    userId,
    profileData
) => {

    try {

        const existingProfile = await TenantProfile.findOne({
            user: userId,
        });

        if (existingProfile) {
            return {
                success: false,
                statusCode: 400,
                message: "Tenant profile already exists",
            };
        }

        const profile = await TenantProfile.create({
            user: userId,
            preferredLocation: profileData.preferredLocation,
            minBudget: profileData.minBudget,
            maxBudget: profileData.maxBudget,
            moveInDate: profileData.moveInDate,
        });

        return {
            success: true,
            statusCode: 201,
            message: "Tenant profile created successfully",
            profile,
        };

    } catch (error) {
        throw error;
    }

};

// =======================
// Get Tenant Profile
// =======================
export const getTenantProfileService = async (userId) => {

    try {

        const profile = await TenantProfile.findOne({
            user: userId,
        });

        if (!profile) {
            return {
                success: false,
                statusCode: 404,
                message: "Tenant profile not found",
            };
        }

        return {
            success: true,
            statusCode: 200,
            profile,
        };

    } catch (error) {
        throw error;
    }

};

// =======================
// Update Tenant Profile
// =======================
export const updateTenantProfileService = async (
    userId,
    profileData
) => {

    try {

        const profile = await TenantProfile.findOne({
            user: userId,
        });

        if (!profile) {
            return {
                success: false,
                statusCode: 404,
                message: "Tenant profile not found",
            };
        }

        if (profileData.preferredLocation !== undefined)
            profile.preferredLocation = profileData.preferredLocation;

        if (profileData.minBudget !== undefined)
            profile.minBudget = profileData.minBudget;

        if (profileData.maxBudget !== undefined)
            profile.maxBudget = profileData.maxBudget;

        if (profileData.moveInDate !== undefined)
            profile.moveInDate = profileData.moveInDate;

        await profile.save();

        return {
            success: true,
            statusCode: 200,
            message: "Tenant profile updated successfully",
            profile,
        };

    } catch (error) {
        throw error;
    }

};