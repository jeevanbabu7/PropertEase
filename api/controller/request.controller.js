import Listing from "../models/listing.model.js";
import RentRequests from "../models/request.model.js";
import Maintenance from "../models/maintenance.model.js";

export const createRequest = async (req,res,next) => {
    try {
        
        const request = await RentRequests.create(req.body);
        return res.status(200).json(request)
    }
    catch(err) {
        
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
        const query = req.body;
        const requests = await RentRequests.find(query).lean().exec();
        res.status(200).json(requests);
    } catch(err) {
        next(err);
    }
}

export const getTenants = async (req, res, next) => {    // fetch tenets for particular owner
    try {
        console.log(req.body)
        const tenants = await Listing.find({ userRef: req.body.id,occupied: true }).lean().exec();

        res.status(200).json(tenants);
    } catch(err) {
        next(err);
    }
}

export const getPropertyDetails = async (req,res,next) => {

    try {
        const tenantId = req.params.tenantId;
        const result = await Listing.find({tenantId: tenantId});
        res.status(200).json(result);

    }catch(err) {
        next(err)
    }
}

export const createMaintanenceRequest = async (req,res,next) => {

    try{
        const request = await Maintenance.create(req.body);
        return res.status(200).json(request)
    }catch(err) {
        next(err)
    }
}

export const getMaintanenceRequest = async (req,res,next) => {
    try {   
        const id = req.params.tenantId;
        console.log("hii");
        const result = await Maintenance.find({tenantId: id})
        res.status(200).json(result)
    }catch(err) {
        next(err)
    }
}
export const getMaintanenceRequestOwner = async (req,res,next) => {
    try {   
        const id = req.params.ownerId;
        const result = await Maintenance.find({ownerId: id})
        console.log(result);
        res.status(200).json(result)
    }catch(err) {
        next(err)
    }
}

export const getMaintenanceDetails = async (req,res,next) => {
    try {   
        const id = req.params.requestId;
        const result = await Maintenance.findById(id)
        res.status(200).json(result)
    }catch(err) {
        next(err)
    }
}

