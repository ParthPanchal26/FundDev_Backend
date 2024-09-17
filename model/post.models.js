import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "Dev"
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
    },
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "Dev"
    },
    totalComments: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Entrepreneur",
        required: true
    },
    userType: {
        type: String,
    }

}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);