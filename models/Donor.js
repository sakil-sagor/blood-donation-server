const mongoose = require("mongoose");
const validator = require('validator');


const donorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
    },

    role: {
        type: String,
        enum: ["donor", "admin"],
        default: "donor",
    },
    status: {
        type: String,
        enum: ["active", "deactive"],
        default: "active",
    },
    donationStatus: {
        type: String,
        enum: ["active", "deactive"],
        default: "active",
    },
    lastDonateDate: {
        type: Date,
        default: new Date("2022-8-1"),
    },

    totalDonate: {
        type: Number,
        default: 0,
    },

    contactNumber: {
        type: String,
        unique: true,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"],
        minLength: 11,
        maxLength: 11,
        required: true,
    },
    bloodGroup: {
        type: String,
        trim: true,
        uppercase: true,
        required: true,
        enum: {
            values: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-",],
            message: "{VALUE} is not a valid name"
        }
    },

    address: {
        district: {
            type: String,
            required: true,
            lowercase: true,
        },
        thana: {
            type: String,
            required: true,
            lowercase: true,
        },


    },

}, {
    timestamps: true,
})

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;