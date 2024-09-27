const { check } = require("express-validator");

exports.checkRegisterInput = [
    check("username").trim().notEmpty().withMessage("Username is required"),
    check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    check("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password is too short (min 8)"),
    check("location").optional().trim(),
    check("gender").optional().trim().isIn(['male', 'female', 'other']).withMessage("Invalid gender"),
    check("role").optional().trim().isIn(['admin', 'recruiter', 'user']).withMessage("Invalid role"),
    check("resume").optional().trim(),
    check("education").optional().trim(),
    check("description").optional().trim().isLength({ max: 500 }).withMessage("Description is too long (max 500)"),
    check("skills").optional().isArray().withMessage("Skills must be an array"),
    check("certifications").optional().isArray().withMessage("Certifications must be an array"),
    check("experience").optional().isArray().withMessage("Experience must be an array")
];

exports.checkLoginInput = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    check("password").trim().notEmpty().withMessage("Password is required"),
];

exports.checkUserUpdateInput = [
    check("username").optional().trim(),
    check("email").optional().trim().isEmail().withMessage("Invalid email"),
    check("location").optional().trim(),
    check("gender").optional().trim().isIn(['male', 'female', 'other']).withMessage("Invalid gender"),
    check("role").optional().trim().isIn(['admin', 'recruiter', 'user']).withMessage("Invalid role"),
    check("resume").optional().trim(),
    check("education").optional().trim(),
    check("description").optional().trim().isLength({ max: 500 }).withMessage("Description is too long (max 500)"),
    check("skills").optional().isArray().withMessage("Skills must be an array"),
    check("certifications").optional().isArray().withMessage("Certifications must be an array"),
    check("experience").optional().isArray().withMessage("Experience must be an array")
];
