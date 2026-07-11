import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// ===============================
// Register
// ===============================
export const register = async (userData) => {

    try {

        const {
            name,
            email,
            password,
            mobile,
            role,
        } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return {
                success: false,
                statusCode: 409,
                message: "Email already exists",
            };

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            role,
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        return {
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            user: userResponse,
        };

    } catch (error) {

        throw error;

    }

};

// ===============================
// Login
// ===============================
export const login = async (userData) => {

    try {

        const { email, password } = userData;

        const user = await User.findOne({ email });

        if (!user) {

            return {
                success: false,
                statusCode: 404,
                message: "User not found",
            };

        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {

            return {
                success: false,
                statusCode: 401,
                message: "Invalid credentials",
            };

        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return {
            success: true,
            statusCode: 200,
            message: "Login successful",
            token,
            user: userResponse,
        };

    } catch (error) {

        throw error;

    }

};

// ===============================
// Get Profile
// ===============================
export const getProfile = async (userId) => {

    try {

        const user = await User.findById(userId).select("-password");

        if (!user) {

            return {
                success: false,
                statusCode: 404,
                message: "User not found",
            };

        }

        return {
            success: true,
            statusCode: 200,
            user,
        };

    } catch (error) {

        throw error;

    }

};