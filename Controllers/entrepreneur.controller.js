import { Entrepreneur } from '../model/entrepreneur.models.js'
import bcrypt from 'bcrypt'
import { sendToken } from '../utils/sendToken.utils.js'
import errorHandler from '../middlewares/error.middleware.js'

export const register = async (req, res, next) => {

    try {

        const { firstname, lastname, username, email, password, comapnyName,
            foundedDate, teamSize, industry, stage, bio, location, website,
            linkedin, github, twitter } = req.body;

        let entre = await Entrepreneur.findOne({
            email,
        });

        if (entre) return res.status(409).send("Already have account!")

        const hashedPassword = await bcrypt.hash(password, 10);

        entre = await Entrepreneur.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            comapnyName,
            foundedDate,
            teamSize,
            industry,
            stage,
            bio,
            location,
            website,
            linkedin,
            github,
            twitter
        });

        sendToken(entre, res, 201, "User SignedUp!")

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await Entrepreneur.findOne({
            email,
        }).select("+password");

        if (!user) return next(new errorHandler("Entrepreneur not found", 404))

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
            message: "Entrepreneur deleted!"
        })

    } catch (error) {

        next(error)

    }

}

export const getMyProfile = async (req, res, next) => {

    try {


        res.status(200).json({
            success: true,
            user: req.entrepreneur,
        });

    } catch (error) {

        next(error)

    }

}

export const updateEntrepreneur = async (req, res, next) => {

    try {

        let user = req.entrepreneur;
        const updateData = req.body;

        const updatedEntrepreneur = await Entrepreneur.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    firstname: updateData.firstname || user.firstname,
                    lastname: updateData.lastname || user.lastname,
                    username: updateData.username || user.username,
                    email: updateData.email || user.email,
                    comapnyName: updateData.comapnyName || user.comapnyName,
                    foundedDate: updateData.foundedDate || user.updateData,
                    teamSize: updateData.teamSize || user.teamSize,
                    industry: updateData.industry || user.industry,
                    stage: updateData.stage || user.stage,
                    bio: updateData.bio || user.bio,
                    location: updateData.location || user.location,
                    website: updateData.website || user.website,
                    linkedin: updateData.linkedin || user.linkedin,
                    github: updateData.github || user.github,
                    twitter: updateData.twitter || user.twitter
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedEntrepreneur) {
            return res.status(404).json({ message: "Entrepreneur not found" });
        }

        res.status(200).json({
            message: "Entrepreneur updated successfully",
            updatedEntrepreneur
        });

    } catch (error) {

        next(error);

    }

}