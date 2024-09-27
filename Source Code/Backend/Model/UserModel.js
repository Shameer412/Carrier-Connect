const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        location: String,
        gender: String,
        role: {
            type: String,
            enum: ["admin", "recruiter", "user"],
        },
        resume: String,
        education: String,
        description: {
            type: String,
            maxLength: 500,
        },
        skills: [String],
        certifications: [String],
        experience: [String],
        image: String, // Add image field
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
