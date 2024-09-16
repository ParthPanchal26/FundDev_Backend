import { Dev } from '../model/dev.models.js'
import bcrypt from 'bcrypt'
import { sendToken } from '../utils/sendToken.utils.js'
import errorHandler from '../middlewares/error.middleware.js'

export const register = async (req, res, next) => {
    try {

        const { firstname, lastname, username, email, password } = req.body;

        let dev = await Dev.findOne({
            email,
        });

        if (dev) return res.status(409).send("User Already Exist")

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await Dev.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });

        sendToken(user, res, 201, "user SignedUp!")

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const user = await Dev.findOne({
            email,
        }).select("+password");

        if (!user) return next(new errorHandler("Devloper not found", 404))

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new errorHandler("Incorrect Password", 400))

        sendToken(user, res, 200, `Welcome, ${user.firstname}`)


    } catch (error) {

        next(error)

    }
}


export const logout = (req, res, next) => {
    try {

        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
            secure: process.env.NODE_ENV === 'Development' ? false : true
        }).json({
            success: true,
            message: "Developer deleted!"
        })

    } catch (error) {

        next(error)

    }
}

export const getMyProfile = (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            user: req.dev,
        });

    } catch (error) {

        next(error)

    }
}

export const devFormController = async (req, res, next) => {

    try {

        let { bio, experience } = req.body;

        // userId = req.dev;

        // let developer = Dev.findOne({
        //     userId
        // })


        res.json({
            user: req.dev,
            bio,
            experience,
        })


    } catch (error) {
        next(error);
    }

}