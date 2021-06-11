import express, { Request, Response } from 'express';
import mongoose, { CallbackError } from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { MongoError } from 'mongodb';

// import { route as userRoute } from "./routes/user";




const app: express.Application = express();


dotenv.config();

const mongoUrl = process?.env?.MONGO_URL;
if(mongoUrl) {
    mongoose.connect(mongoUrl,  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err: CallbackError) => {
        if(err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log("Connected to MongoDB");
        }
    });
} else {
    throw new Error("No URL to MongoDB are provided! Please use ENV MONGO_URL to provide a connection string");
}


if( !(process?.env?.SKIP_INDEX && process?.env?.SKIP_INDEX.toUpperCase() === "TRUE") ) {
    // Build Index
}

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//app.use("/api/auth", authRoute);


app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to EatAPI...");
});

app.listen(8800, () => {
    console.log("Backend server is running...");
});