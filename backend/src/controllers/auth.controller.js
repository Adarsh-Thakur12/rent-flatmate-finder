import {
    register,
    login,
    getProfile,
} from "../services/auth.service.js";

// ===============================
// Register
// ===============================
export const registerUser = async (req, res) => {

    try {

        const result = await register(req.body);

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

// ===============================
// Login
// ===============================
export const loginUser = async (req, res) => {

    try {

        const result = await login(req.body);

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

// ===============================
// Get Logged In User Profile
// ===============================
export const getProfileController = async (req, res) => {

    try {

        const result = await getProfile(req.user.id);

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