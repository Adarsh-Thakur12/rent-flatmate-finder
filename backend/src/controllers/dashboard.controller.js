import { getOwnerDashboardService } from "../services/dashboard.service.js";

export const getOwnerDashboard = async (req, res) => {
    try {

        const result = await getOwnerDashboardService(
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