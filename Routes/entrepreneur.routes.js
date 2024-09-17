import express, { Route } from "express";
import {register, login, logout, getMyProfile, updateEntrepreneur} from '../Controllers/entrepreneur.controller.js'
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/new', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/me', isAuthenticated, getMyProfile);

router.put('/updateentrepreneur', isAuthenticated, updateEntrepreneur);

export default router;