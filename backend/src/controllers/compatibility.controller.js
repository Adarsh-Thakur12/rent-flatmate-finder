import { generateCompatibilityService } from "../services/compatibility.service.js";

export const generateCompatibility = async (req, res) => {
    try {

        console.log("req.user =", req.user);
        console.log("CONTROLLER HIT");
        const result = await generateCompatibilityService(
            req.user.id,
            req.params.propertyId
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