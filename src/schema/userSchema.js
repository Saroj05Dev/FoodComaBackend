const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "First name must be atleast 3 characters long"],
        maxLength: [15, "First name must be atmost 15 characters long"],
        lowercase: true,
        trim: true // removes extra spaces at starting and ending
    },

    lastName: {
        type: String,
        minLength: [3, "Last name must be atleast 3 characters long"],
        maxLength: [15, "Last name must be atmost 15 characters long"],
        lowercase: true,
        trim: true // removes extra spaces at starting and ending
    },

    mobileNumber: {
        type: String,
        trim: true,
        minLength: [10, "Mobile number should be 10 digits long"],
        maxLength: [10, "Mobile number should be 10 digits long"],
        unique: [true, "Mobile number is already in use"],
        required: [true, "Mobile number should be provided"]
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provided"],
        unique: [true, "Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: true,
        match: [
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*(\d|\W)).{8,}$/,
            "The password must have at least 8 characters, one uppercase, one lowercase, and one number or special character"
        ]
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },

    address: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    // Here you can modify your user before it is saved in DB
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

module.exports = User;