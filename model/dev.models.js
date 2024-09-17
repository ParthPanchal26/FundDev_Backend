import mongoose from "mongoose";

const devSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    twitter: {
        type: String
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    portfolio: {
        type: String
    },
    preferredRole: {
        type: String,
        required: true
    },
    remote: {
        type: Boolean,
    },
    skills: {
        type: [String],
        required: true
    },
    userType: {
        type: String,
    }

}, { timestamps: true });

export const Dev = mongoose.model("Dev", devSchema);
