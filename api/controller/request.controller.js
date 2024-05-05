import Listing from "../models/listing.model.js";
import RentRequests from "../models/request.model.js";

export const createRequest = async (req,res,next) => {
    try {
        const request =await RentRequests.create(req.body);
        return res.status(200).json(request)
    }
    catch(err) {
        next(err);
        console.log(err.message);

    }
}

export const serviceRequest = async (req,res,next) => {
    try {
        const updatedRequest = await RentRequests.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                status: req.body.status
              },
            },
            { new: true }
        );
        res.status(200).json(updatedRequest)

    }
    catch(err) {
        next(err)
    }
}

export const getRequests = async (req, res, next) => { // Get all the request for owner 
    try {
        const requests = await RentRequests.find({ ownerId: req.body.id }).lean().exec();
        res.status(200).json(requests);
    } catch(err) {
        next(err);
    }
}

export const getTenants = async (req, res, next) => {    // fetch tenets for particular owner
    try {
        console.log(req.body)
        const tenants = await Listing.find({ userRef: req.body.id,occupied: true }).lean().exec();
        console.log(tenants);
        res.status(200).json(tenants);
    } catch(err) {
        next(err);
    }
}

