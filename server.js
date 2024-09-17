import express from "express";
import devRouter from './Routes/dev.routes.js'
import investorRouter from './Routes/investor.routes.js'
import entrepreneurRouter from './Routes/entrepreneur.routes.js'
import postRouter from './Routes/post.routes.js'
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { connectDB } from "./config/db.config.js";
const app = express();

config({
    path: './config/config.env'
})

connectDB();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));



app.use("/api/v1/dev", devRouter);
app.use("/api/v1/investor", investorRouter);
app.use("/api/v1/entrepreneur", entrepreneurRouter);
app.use("/api/v1/post", postRouter);

app.use(errorMiddleware)

app.get('/' , (req , res)=>{
   res.send(`Tu mera koi na hoke bhi kuchh lage, chin tapak dam dam, us pondry ke dan ke bille`)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});