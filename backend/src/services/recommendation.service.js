import Property from "../models/Property.js";
import Compatibility from "../models/Compatibility.js";

import {
    generateCompatibilityService,
} from "./compatibility.service.js";

// ==========================================
// Generate Recommendations
// ==========================================
export const generateRecommendationsService = async (
    tenantId
) => {

    try {

        // ------------------------------------
        // Fetch all available properties
        // ------------------------------------
        const properties = await Property.find();

        if (properties.length === 0) {

            return {
                success: false,
                statusCode: 404,
                message: "No properties found",
            };

        }

        const recommendations = [];

        // ------------------------------------
        // Generate compatibility for each
        // ------------------------------------
        for (const property of properties) {

            let compatibility =
                await Compatibility.findOne({

                    tenant: tenantId,

                    property: property._id,

                });

            // If compatibility does not exist,
            // generate it using Gemini
            if (!compatibility) {

                const result =
                    await generateCompatibilityService(
                        tenantId,
                        property._id
                    );

                if (!result.success) {
                    continue;
                }

                compatibility =
                    result.compatibility;

            }

            recommendations.push({

                property,

                score: compatibility.score,

                explanation:
                    compatibility.explanation,

            });

        }

        // ------------------------------------
        // Sort by score
        // ------------------------------------
        recommendations.sort(
            (a, b) => b.score - a.score
        );

        // ------------------------------------
        // Return Top 5
        // ------------------------------------
        return {

            success: true,

            statusCode: 200,

            count: Math.min(
                recommendations.length,
                5
            ),

            recommendations:
                recommendations.slice(0, 5),

        };

    } catch (error) {

        throw error;

    }

};