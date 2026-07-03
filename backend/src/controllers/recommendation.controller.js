import { generateRecommendationsService } from "../services/recommendation.service.js";

export const generateRecommendations = async (req, res) => {

    try {

        const result = await generateRecommendationsService(
            req.user.id
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            statusCode: 500,
            message: "Internal Server Error",

        });

    }

};