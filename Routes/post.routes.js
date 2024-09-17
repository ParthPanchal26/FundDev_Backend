import express, { Route } from "express";
import { createPost, getMyPost, allPosts, updatePost, deletePost } from '../Controllers/post.controller.js'
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/newpost', isAuthenticated, createPost);

router.get('/myPost', isAuthenticated, getMyPost);

router.get('/allposts', allPosts)

router.put('/updatepost/:postId', isAuthenticated, updatePost);

router.delete('/deletePost/:postId', isAuthenticated, deletePost);

export default router;