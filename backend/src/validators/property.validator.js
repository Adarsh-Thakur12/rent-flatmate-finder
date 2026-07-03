import { body, validationResult } from "express-validator";

export const validateProperty = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 20 })
        .withMessage("Description must be at least 20 characters"),

    body("rent")
        .notEmpty()
        .withMessage("Rent is required")
        .isNumeric()
        .withMessage("Rent must be a number")
        .custom(value => value > 0)
        .withMessage("Rent must be greater than 0"),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),

    body("locality")
        .trim()
        .notEmpty()
        .withMessage("Locality is required"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),

    body("bhk")
        .isIn([1, 2, 3, 4, 5])
        .withMessage("BHK must be between 1 and 5"),

    body("bathrooms")
        .isInt({ min: 1 })
        .withMessage("Bathrooms must be at least 1"),

    body("furnished")
        .isIn([
            "Furnished",
            "Semi-Furnished",
            "Unfurnished"
        ])
        .withMessage("Invalid furnishing type"),

    body("parking")
        .isBoolean()
        .withMessage("Parking must be true or false"),

    body("genderPreference")
        .optional()
        .isIn([
            "Male",
            "Female",
            "Any"
        ])
        .withMessage("Invalid gender preference"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });

        }

        next();

    }

];