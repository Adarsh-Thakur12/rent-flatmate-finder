import {
    addPropertyService,
    getAllPropertiesService,
    getPropertyByIdService,
    getMyPropertiesService,
    updatePropertyService,
    deletePropertyService,
} from "../services/property.service.js";

// ======================
// Add Property
// ======================
export const addProperty = async (req, res) => {
    try {

        const result = await addPropertyService(
            req.body,
            req.user.id,
            req.user.role
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

// ======================
// Get All Properties
// ======================
export const getAllProperties = async (req, res) => {
    try {

        const result = await getAllPropertiesService(req.query);

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

// ======================
// Get Property By ID
// ======================
export const getPropertyById = async (req, res) => {
    try {

        const result = await getPropertyByIdService(req.params.id);

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

// ======================
// Get My Properties
// ======================
export const getMyProperties = async (req, res) => {
    try {

        const result = await getMyPropertiesService(req.user.id);

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

// ======================
// Update Property
// ======================
export const updateProperty = async (req, res) => {
    try {

        const result = await updatePropertyService(
            req.params.id,
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

// ======================
// Delete Property
// ======================
export const deleteProperty = async (req, res) => {
    try {

        const result = await deletePropertyService(
            req.params.id,
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

export const uploadPropertyImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });

        }

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            imageUrl: req.file.path,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};