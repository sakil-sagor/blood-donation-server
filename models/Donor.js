const mongoose = require("mongoose");
const validator = require('validator');


const donorSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
        // validate: {
        //     validator: (value) =>
        //         validator.isStrongPassword(value, {
        //             minLength: 6,
        //             minUppercase: 1,
        //         }),
        //     message: "Password {VALUE} is not strong enough.",
        // },
    }, confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords don't match!",
        },
    },
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],

    },
    role: {
        type: String,
        enum: ["donor", "admin"],
        default: "donor",
    },
    lastDonateDate: {
        type: Date,
        default: new Date("2022-11-21"),
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
    nidNumber: {
        type: Number,
        minLength: 10,
        default: "0123456789",
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