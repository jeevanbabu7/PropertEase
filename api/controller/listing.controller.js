
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