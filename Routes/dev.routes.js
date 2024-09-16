import express, { Route } from "express";
import {register, login, logout, getMyProfile, updateDev} from '../Controllers/dev.controller.js'
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/me', isAuthenticated, getMyProfile);

router.put('/updatedev', isAuthenticated, updateDev);

export default router;