import { register, login } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    try {

        const result = await register(req.body);

        return res.status(result.statusCode).json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

export const loginUser = async (req, res) => {
    try {

        const result = await login(req.body);

        return res.status(result.statusCode).json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};