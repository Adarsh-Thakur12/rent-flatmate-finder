import {
    createTenantProfileService,
    getTenantProfileService,
    updateTenantProfileService,
} from "../services/tenantProfile.service.js";

// =======================
// Create Tenant Profile
// =======================
export const createTenantProfile = async (req, res) => {

    try {

        if (req.user.role !== "tenant") {
            return res.status(403).json({
                success: false,
                message: "Only tenants can create a profile",
            });
        }

        const result = await createTenantProfileService(
            req.user.id,
            req.body
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
// Get Tenant Profile
// =======================
export const getTenantProfile = async (req, res) => {

    try {

        const result = await getTenantProfileService(
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

// =======================
// Update Tenant Profile
// =======================
export const updateTenantProfile = async (req, res) => {

    try {

        if (req.user.role !== "tenant") {
            return res.status(403).json({
                success: false,
                message: "Only tenants can update a profile",
            });
        }

        const result = await updateTenantProfileService(
            req.user.id,
            req.body
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