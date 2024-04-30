
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export  const createListing = async (req,res,next) => {
    try {
        const listing =await Listing.create(req.body);
        return res.status(200).json(listing)

    }
    catch(err) {
        next(err);

    }
}

export const getUserListing = async (req,res,next) => {
    if(req.user.id == req.params.id) {
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        }catch(err) {
            next(err)
        }
    }
    else {
        return next(errorHandler("Unauthorized..."))
    }
}

export const deleteProperty = async (req,res,next) => {
    
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) {
            return next(errorHandler(405,"Property not found."))
        }
        
        // if(req.id.tostring() !== listing.userRef.tostring()) {
        //     return next(errorHandler(401,"Unauthorized"));
        // }
       
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Succeffully deleted.")
    }catch(err) {
        next(err);
    }

} 

export const updateProperty = async (req,res,next) => {

    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(405,"Property not found."))
    }
    
    // if(req.id.tostring() !== listing.userRef.tostring()) {
    //     return next(errorHandler(401,"Unauthorized"));
    // }

    try {
        const update = await Listing.findByIdAndUpdate(req.params.id,req.body,{new: true})

        res.status(200).json(update)
    }
    catch(err) {
        next(err)
    }

}