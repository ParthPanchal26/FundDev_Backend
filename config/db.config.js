import mongoose from "mongoose";

export const connectDB = async () => {
    
    await mongoose.connect(process.env.DB_URI, {
        dbName: "SIH_backend",
    })
    .then((host) => {
        console.log(`DB connected: : ${host.connection.host}`);
    })
    .catch((err) => {
        console.log(`DB connection error: : ${err}`)
    })
}