import { Dev } from '../model/dev.models.js'
import bcrypt from 'bcrypt'
import { sendToken } from '../utils/sendToken.utils.js'
import errorHandler from '../middlewares/error.middleware.js'

export const register = async (req, res, next) => {
    try {

        const { firstname, lastname, username, email, password,
            bio, experience, github, linkedin, twitter, hourlyRate, location,
            portfolio, preferredRole, remote, userType, skills } = req.body;

        let dev = await Dev.findOne({
            email,
        });

        if (dev) return res.status(409).send("Already have account!")

        const hashedPassword = await bcrypt.hash(password, 10);

        dev = await Dev.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            bio,
            experience,
            github,
            linkedin,
            twitter,
            hourlyRate,
            location,
            portfolio,
            preferredRole,
            remote,
            resume,
            skills,
            pastProjects
        });

        sendToken(dev, res, 201, "user SignedUp!")

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

export const updateDev = async (req, res, next) => {
    try {

        let user = req.dev;
        const updateData = req.body;

        const updatedDev = await Dev.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    firstname: updateData.firstname || user.firstname,
                    lastname: updateData.lastname || user.lastname,
                    username: updateData.username || user.username,
                    email: updateData.email || user.email,
                    bio: updateData.bio || user.bio,
                    experience: updateData.experience || user.experience,
                    github: updateData.github || user.github,
                    linkedin: updateData.linkedin || user.linkedin,
                    twitter: updateData.twitter || user.twitter,
                    hourlyRate: updateData.hourlyRate || user.hourlyRate,
                    location: updateData.location || user.location,
                    portfolio: updateData.portfolio || user.portfolio,
                    preferredRole: updateData.preferredRole || user.preferredRole,
                    remote: updateData.remote !== undefined ? updateData.remote : user.remote,
                    resume: updateData.resume || user.resume
                },
                ...(updateData.skills ? { $push: { skills: { $each: updateData.skills } } } : {}),
                ...(updateData.pastProjects ? { $push: { pastProjects: { $each: updateData.pastProjects } } } : {})
            },
            { new: true, runValidators: true }
        );

        if (!updatedDev) {
            return res.status(404).json({ message: "Developer not found" });
        }

        res.status(200).json({
            message: "Developer updated successfully",
            updatedDev
        });
        
    } catch (error) {
        next(error);
    }
};
