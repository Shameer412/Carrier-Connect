const UserModel = require("../Model/UserModel");
const createError = require("http-errors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWTGenerator = require("../Utils/JWTGenerator");

exports.getAllUser = async (req, res, next) => {
    try {
        const result = await UserModel.find({}).select("-password");
        res.status(200).json({
            status: true,
            result,
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const me = req.user;
        if (!me) {
            return next(createError(401, "Please login first"));
        }
        res.status(200).json({
            status: true,
            result: me,
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.logOut = async (req, res, next) => {
    try {
        res.cookie(process.env.COOKIE_NAME, "", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            expires: new Date(0), // Set to a date in the past
            path: "/", // Ensure this matches the path set during login
        })
            .status(200)
            .json({
                status: true,
                message: "Logout done",
            });
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.getSingleUser = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, "Invalid user ID"));
    }
    try {
        const user = await UserModel.findById(id).select("-password");
        if (!user) {
            return next(createError(404, "User not found"));
        }
        res.status(200).json({
            status: true,
            result: user,
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.addUser = async (req, res, next) => {
    const data = req.body;
    try {
        const isUserExists = await UserModel.findOne({ email: data.email });
        if (isUserExists) {
            return next(createError(400, "Email Already exists"));
        }
        const isFirstUser = (await UserModel.countDocuments()) === 0;
        data.role = isFirstUser ? "admin" : data.role || "user";

        const newUser = new UserModel(data);
        await newUser.save();
        res.status(201).json({
            status: true,
            message: "Registered Successfully",
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return next(createError(404, "User not found"));
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return next(createError(400, "Email or Password not matched"));
        }
        if (role && user.role !== role) {
            return next(createError(403, "Not Found"));
        }

        const tokenObj = { ID: user._id, role: user.role };
        const TOKEN = JWTGenerator(tokenObj);
        const one_day = 1000 * 60 * 60 * 24;

        res.cookie(process.env.COOKIE_NAME, TOKEN, {
            expires: new Date(Date.now() + one_day),
            secure: true,
            httpOnly: true,
            signed: true,
            sameSite: "None",
        });

        res.status(200).json({
            status: true,
            message: "Login Successfully",
            role: user.role,
        });
    } catch (error) {
        next(createError(500, `Something wrong: ${error.message}`));
    }
};

const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage }).single('image'); // Middleware for single file upload

// Update user
exports.updateUser = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        try {
            const userId = req.params.id;
            const { username, location, description, resume, gender, education, skills, certifications, experience } = req.body;

            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update fields
            user.username = username;
            user.location = location;
            user.description = description;
            user.resume = resume;
            user.gender = gender;
            user.education = education;
            user.skills = skills;
            user.certifications = certifications;
            user.experience = experience;

            // Handle image upload
            if (req.file) {
                const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
                user.image = imageUrl;
            }

            await user.save();

            res.status(200).json({ message: 'Profile updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};




exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, "Invalid User ID format"));
    }
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "User Deleted",
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.deleteAllUser = async (req, res, next) => {
    try {
        await UserModel.deleteMany({});
        res.status(200).json({
            status: true,
            message: "All users deleted",
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};
