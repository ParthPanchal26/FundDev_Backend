import jwt from 'jsonwebtoken';
import { Dev } from '../model/dev.models.js'
import { Investor } from '../model/investor.models.js';
import { Entrepreneur } from '../model/entrepreneur.models.js';

export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return res.status(404).json({
        success: false,
        message: "Not LoggedIn!",
    })

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.dev = await Dev.findById(decode._id);
    req.investor = await Investor.findById(decode._id);
    req.entrepreneur = await Entrepreneur.findById(decode._id);
    
    next();

}