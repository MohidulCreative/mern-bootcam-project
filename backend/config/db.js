import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import DB_NAME from "../constant.js"

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Database connected!! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

export default connectDb;