import Compatibility from "../models/Compatibility.js";
import Property from "../models/Property.js";
import TenantProfile from "../models/TenantProfile.js";

import { buildCompatibilityPrompt } from "../prompts/compatibility.prompt.js";
import { generateCompatibility } from "./gemini.service.js";
import { compatibilityFallback } from "../utils/compatibilityFallback.js";

// ======================================
// Generate Compatibility
// ======================================
export const generateCompatibilityService = async (
    tenantId,
    propertyId
) => {

    try {

        // -----------------------------
        // Check if compatibility exists
        // -----------------------------
        const existingCompatibility =
            await Compatibility.findOne({
                tenant: tenantId,
                property: propertyId,
            });

        if (existingCompatibility) {

            return {
                success: true,
                statusCode: 200,
                compatibility: existingCompatibility,
            };

        }

        // -----------------------------
        // Get Property
        // -----------------------------
        const property =
            await Property.findById(propertyId);

        if (!property) {

            return {
                success: false,
                statusCode: 404,
                message: "Property not found",
            };

        }

        // -----------------------------
        // Get Tenant Profile
        // -----------------------------
        const profile =
            await TenantProfile.findOne({
                user: tenantId,
            });

        if (!profile) {

            return {
                success: false,
                statusCode: 404,
                message: "Tenant profile not found",
            };

        }

        let result;

        // -----------------------------
        // Try Gemini
        // -----------------------------
        try {

            const prompt =
                buildCompatibilityPrompt(
                    property,
                    profile
                );

            result =
                await generateCompatibility(
                    prompt
                );

        }

        // -----------------------------
        // Fallback
        // -----------------------------
        catch (error) {

            console.log(
                "Gemini failed. Using fallback..."
            );

            result =
                compatibilityFallback(
                    property,
                    profile
                );

        }

        // -----------------------------
        // Save
        // -----------------------------
        const compatibility =
            await Compatibility.create({

                tenant: tenantId,

                property: propertyId,

                score: result.score,

                explanation:
                    result.explanation,

            });

        return {

            success: true,

            statusCode: 201,

            message:
                "Compatibility generated successfully",

            compatibility,

        };

    } catch (error) {

        throw error;

    }

};