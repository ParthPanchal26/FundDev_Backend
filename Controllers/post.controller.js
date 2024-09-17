import { Types } from "mongoose";
import { Entrepreneur } from "../model/entrepreneur.models.js";
import { Post } from "../model/post.models.js";

export const createPost = async (req, res, next) => {

    try {

        const { title, description, theme, category, budget } = req.body;

        const owner = req.entrepreneur._id
        // console.log(req.entrepreneur);
        // console.log(req.entrepreneur._id);

        let post = await Post.create({
            title,
            description,
            theme,
            category,
            budget,
            owner
        });

        // console.log(post)

        res.status(201).json({
            success: true,
            message: "Post Created"
        });

    } catch (error) {
        next(error)
    }

}


export const getMyPost = async (req, res, next) => {

    try {

        const owner_id = req.entrepreneur._id;

        let myPost = await Post.find({
            owner: owner_id
        })

        res.status(200).json({
            success: true,
            post: myPost
        })


    } catch (error) {
        next(error);
    }

}


export const allPosts = async (req, res, next) => {

    try {

        let posts = await Post.find()

        res.json({
            success: true,
            posts
        })

    } catch (error) {
        next(error)
    }

}


export const updatePost = async (req, res, next) => {

    try {

        let creator = req.entrepreneur;
        const { postId } = req.params;
        const updatePostData = req.body;

        if (!Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid postId format!"
            });
        }

        let myPost = await Post.findOne({
            _id: postId,
            owner: creator._id
        });

        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId, owner: creator._id },
            { $set: updatePostData },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found or you don't have permission to update this post!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            updatedPost
        });

    } catch (error) {

        next(error)

    }
}

export const deletePost = async (req, res, next) => {

    try {

        const { postId } = req.params;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found!"
            });
        }

        res.json({
            success: true,
            message: "Post Deleted!",
            deletedPostDocument: deletedPost
        })

    } catch (error) {

        next(error)

    }
}