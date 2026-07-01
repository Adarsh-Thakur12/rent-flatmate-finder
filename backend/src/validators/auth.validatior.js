import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("mobile")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),

  body("role")
    .isIn(["owner", "tenant"])
    .withMessage("Invalid role"),

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