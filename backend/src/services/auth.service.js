import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


export const register = async (userData) => {
  try {
   const { name, email, password, mobile, role } = userData;
    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        success: false,
        statusCode: 409,
        message: "Email already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
    name,
    email,
    password: hashedPassword,
    mobile,
    role,
});

    // Hide password
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

export const login = async (userData) => {
    try {

        const { email, password } = userData;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: "User not found",
            };
        }

        // Compare password
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

        // Generate JWT Token
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

        // Remove password
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