import Property from "../models/Property.js";

// ===============================
// Add Property
// ===============================
export const addPropertyService = async (
    propertyData,
    ownerId,
    role
) => {

    try {

        if (role !== "owner") {
            return {
                success: false,
                statusCode: 403,
                message: "Only owners can add properties",
            };
        }

        const property = await Property.create({
            ...propertyData,
            owner: ownerId,
        });

        return {
            success: true,
            statusCode: 201,
            message: "Property added successfully",
            property,
        };

    } catch (error) {
        throw error;
    }

};

// ===============================
// Get All Properties
// ===============================
export const getAllPropertiesService = async (query) => {

    try {

        const {
            city,
            locality,
            bhk,
            furnished,
            parking,
            genderPreference,
            rentMin,
            rentMax,
            search,
            page = 1,
            limit = 10,
            sort = "-createdAt",
        } = query;

        const filter = {};

        if (city)
            filter.city = city;

        if (locality)
            filter.locality = locality;

        if (bhk)
            filter.bhk = Number(bhk);

        if (furnished)
            filter.furnished = furnished;

        if (parking !== undefined)
            filter.parking = parking === "true";

        if (genderPreference)
            filter.genderPreference = genderPreference;

        // Rent Filter
        if (rentMin || rentMax) {

            filter.rent = {};

            if (rentMin)
                filter.rent.$gte = Number(rentMin);

            if (rentMax)
                filter.rent.$lte = Number(rentMax);

        }

        // Search by title
        if (search) {

            filter.title = {
                $regex: search,
                $options: "i",
            };

        }

        const skip = (page - 1) * limit;

        const total = await Property.countDocuments(filter);

        const properties = await Property.find(filter)
        .populate("owner", "name email mobile")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

        return {

            success: true,
            statusCode: 200,
            count: properties.length,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            properties,

        };

    } catch (error) {

        throw error;

    }

};
// ===============================
// Get Property By ID
// ===============================
export const getPropertyByIdService = async (propertyId) => {

    try {

        const property = await Property.findById(propertyId)
            .populate("owner", "name email mobile");

        if (!property) {
            return {
                success: false,
                statusCode: 404,
                message: "Property not found",
            };
        }

        return {
            success: true,
            statusCode: 200,
            property,
        };

    } catch (error) {
        throw error;
    }

};

// ===============================
// Get My Properties
// ===============================
export const getMyPropertiesService = async (ownerId) => {

    try {

        const properties = await Property.find({
            owner: ownerId,
        });

        return {
            success: true,
            statusCode: 200,
            count: properties.length,
            properties,
        };

    } catch (error) {
        throw error;
    }

};

// ===============================
// Update Property
// ===============================
export const updatePropertyService = async (
    propertyId,
    ownerId,
    updatedData
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

        if (property.owner.toString() !== ownerId) {

            return {
                success: false,
                statusCode: 403,
                message: "You are not authorized to update this property",
            };

        }

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            updatedData,
            {
                new: true,
                runValidators: true,
            }
        );

        return {
            success: true,
            statusCode: 200,
            message: "Property updated successfully",
            property: updatedProperty,
        };

    } catch (error) {
        throw error;
    }

};

// ===============================
// Delete Property
// ===============================
export const deletePropertyService = async (
    propertyId,
    ownerId
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

        if (property.owner.toString() !== ownerId) {

            return {
                success: false,
                statusCode: 403,
                message: "You are not authorized to delete this property",
            };

        }

        await Property.findByIdAndDelete(propertyId);

        return {
            success: true,
            statusCode: 200,
            message: "Property deleted successfully",
        };

    } catch (error) {
        throw error;
    }

};