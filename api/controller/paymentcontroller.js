import Listing from "../models/listing.model.js";
import Payment from "../models/payment.model.js";

export const getUserData = async (req,res,next) => {
    
    try {
        const result = await Listing.find({tenantId: req.params.id});
        res.status(200).json(result);
    }catch(err) {
        next(err)
    }
}

export const checkPayment = async (req,res,next) => {
    try{
        const tenantId = req.params.id;
        const exists = await Payment.existsWithinMonth(tenantId, new Date());
        console.log(exists);
        res.status(200).json(exists)
    }catch(err) {
        next(err);
    }
}

export const payRent = async (req,res,next) => {
    try {
        // Extract the payment details from the request body
        console.log("hiii");
        const { tenantName, tenantId, ownerId} = req.body;

        // Create a new payment instance
        const payment = new Payment({
            tenantName,
            tenantId,
            ownerId,
            paymentDate: new Date(),
            done: true
        });

        // Save the payment to the database
        await payment.save();
        res.status(201).json("Payment successfull");
    } catch (err) {
        next(err);
    }
}

export const getPaymentHistory = async (res,req,next) => {
    try { 
        
        const res = await Payment.find({tenantId: req.params.id });
        console.log("hiiii");
        res.send(200).json(res)
    }catch(err) {
        next(err);
    }
}