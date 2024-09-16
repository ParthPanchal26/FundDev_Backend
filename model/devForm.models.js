import mongoose from "mongoose";

const devFormSchema = mongoose.Schema({
    bio: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    github: {
        type: URL,
        required: true
    },
    linkedin: {
        type: URL,
        required: true
    },
    twitter: {
        type: URL
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
        type: URL
    },
    preferredRole: {
        type: String,
        required: true
    },
    remote: {
        type: Boolean,
    },
    resume: {
        type: Buffer,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    pastProjects: {
        type: [URL]
    }

}, {timestamps: true});

export const devForm = mongoose.model("devForm", devFormSchema);