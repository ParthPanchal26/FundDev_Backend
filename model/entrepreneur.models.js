import mongoose from "mongoose";

const entrepreneurSchema = mongoose.Schema({
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
    comapnyName: {
        type: String,
        required: true
    },
    foundedDate: {
        type: Date,
        required: true
    },
    teamSize: {
        type: Number,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    userType: {
        type: String,
    }

}, { timestamps: true });

export const Entrepreneur = mongoose.model("Entrepreneur", entrepreneurSchema);