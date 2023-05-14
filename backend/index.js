import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import cookieParser from "cookie-parser";
import ProductRouter from "./routers/ProductRouter.js";
import UserRouter from "./routers/UserRouter.js";
import AddressRouter from "./routers/AddressRouter.js";
import dotenv from 'dotenv';
import CartRouter from "./routers/CartRouter.js";
import StoreRouter from "./routers/StoreRouter.js";
import CommentRouter from "./routers/CommentRouter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(cookieParser());

//connect BD

mongoose.connect(process.env.MONGODB_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connect success")
})

mongoose.connection.on("disconnect",()=>{
    console.log("disconnect DB")
})

//router
app.use('/api/product', ProductRouter);
app.use('/api/users', UserRouter);
app.use('/api/address', AddressRouter);
app.use('/api/cart', CartRouter);
app.use('/api/store', StoreRouter);
app.use('/api/comment', CommentRouter);


//middleware 
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(5000, ()=>{
    console.log("5000")
})