import express, { Route } from "express";
import {register, login, logout, getMyProfile, updateinvestor} from '../Controllers/investor.controller.js'
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/new', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/me', isAuthenticated, getMyProfile);

router.put('/updateinvestor', isAuthenticated, updateinvestor);

export default router;