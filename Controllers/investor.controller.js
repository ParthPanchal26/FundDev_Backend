import { Investor } from '../model/investor.models.js'
import bcrypt from 'bcrypt'
import { sendToken } from '../utils/sendToken.utils.js'
import errorHandler from '../middlewares/error.middleware.js'

export const register = async (req, res, next) => {

    try {

        const { firstname, lastname, username, email, password, firmname, maxInvestmentRange,
            minInvestmentRange, portfolioSize, preferredStages, preferredIndustries,
            investmentHistory, bio, location, website, linkedin, twitter } = req.body;

        let investor = await Investor.findOne({
            email,
        });

        if (investor) return res.status(409).send("User Already Exist")

        const hashedPassword = await bcrypt.hash(password, 10);

        investor = await Investor.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            firmname,
            maxInvestmentRange,
            minInvestmentRange,
            portfolioSize,
            preferredStages,
            preferredIndustries,
            investmentHistory,
            bio,
            location,
            website,
            linkedin,
            twitter
        });

        sendToken(investor, res, 201, "user SignedUp!")

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await Investor.findOne({
            email,
        }).select("+password");

        if (!user) return next(new errorHandler("Investor not found", 404))

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
            message: "Investor deleted!"
        })

    } catch (error) {

        next(error)

    }

}

export const getMyProfile = async (req, res, next) => {

    try {

        
        res.status(200).json({
            success: true,
            user: req.investor,
        });

    } catch (error) {

        next(error)

    }

}

export const updateinvestor = async (req, res, next) => {

    try {

        let user = req.investor;
        const updateData = req.body;

        const updatedInvestor = await Investor.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    firstname: updateData.firstname || user.firstname,
                    lastname: updateData.lastname || user.lastname,
                    username: updateData.username || user.username,
                    email: updateData.email || user.email,
                    bio: updateData.bio || user.bio,
                    linkedin: updateData.linkedin || user.linkedin,
                    twitter: updateData.twitter || user.twitter,
                    location: updateData.location || user.location,
                    portfolioSize: updateData.portfolioSize || user.portfolioSize,
                    firmname: updateData.firmname || user.firmname,
                    maxInvestmentRange: updateData.maxInvestmentRange || user.maxInvestmentRange,
                    minInvestmentRange: updateData.minInvestmentRange || user.minInvestmentRange,
                    portfolioSize: updateData.portfolioSize || user.portfolioSize,
                    preferredStages: updateData.preferredStages || user.preferredStages,
                    preferredIndustries: updateData.preferredIndustries || user.preferredIndustries,
                    investmentHistory: updateData.investmentHistory || user.investmentHistory,
                    website: updateData.website || user.website,
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedInvestor) {
            return res.status(404).json({ message: "Investor not found" });
        }

        res.status(200).json({
            message: "Investor updated successfully",
            updatedInvestor
        });
    
    } catch (error) {

        next(error);
    
    }

}