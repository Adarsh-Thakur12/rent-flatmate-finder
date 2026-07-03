import { body, validationResult } from "express-validator";

export const validateRegister = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),

    body("mobile")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be exactly 10 digits"),

    body("role")
        .isIn(["owner", "tenant"])
        .withMessage("Role must be owner or tenant"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        next();
    },
];

export const validateLogin = [

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });

        }

        next();
    },
];