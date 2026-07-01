import User from "../models/User.js";

export const register = async (userData) => {

    const { email } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

        return {
            success: false,
            statusCode: 409,
            message: "Email already registered"
        };

    }

    const user = await User.create(userData);

    return {

        success: true,

        statusCode: 201,

        message: "User registered successfully",

        user

    };

};