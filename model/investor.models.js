import mongoose from "mongoose";

const investorSchema = mongoose.Schema({
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
    firmname: {
        type: String,
        required: true
    },
    maxInvestmentRange: {
        type: Number,
        required: true
    },
    minInvestmentRange: {
        type: Number,
        required: true
    },
    portfolioSize: {
        type: Number,
        required: true
    },
    preferredStages: {
        type: String,
        required: true
    },
    preferredIndustries: {
        type: String,
        required: true
    },
    investmentHistory: {
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
    },
    linkedin: {
        type: String,
        required: true
    },
    twitter: {
        type: String
    },
    userType: {
        type: String,
    }

}, { timestamps: true });

export const Investor = mongoose.model("Investor", investorSchema);