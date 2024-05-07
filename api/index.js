import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import requestRouter from './routes/request.route.js'
import cors from 'cors' // imppppppppp
import cookieParser from 'cookie-parser';
import paymentRouter from './routes/payment.route.js'

dotenv.config(); 

// connect databae
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to db")
    }).catch((err) => {
        console.log(err);
    })


const port = 5000;

const app = express()

app.use(cookieParser()) // use cookie for authentication
app.use(express.json())
app.use(cors()) // important

app.listen(port ,() => {
    console.log("Server is listening on port ",port);
})    

// 
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)
app.use('/api/request',requestRouter);
app.use('/api/payment',paymentRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(statusCode).json({
        success: false ,
        statusCode,
        message
    })
})

 
     
