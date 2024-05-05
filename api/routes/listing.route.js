import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing,deleteProperty, updateProperty,propertyDetails,getListing ,updatePropertyStatus} from '../controller/listing.controller.js';
import { createRequest } from '../controller/request.controller.js';
const router = express.Router();

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteProperty);
router.post('/update/:id',verifyToken,updateProperty) // update property data
router.get('/property/:id',verifyToken,propertyDetails); // fetch info about single property
router.get('/get',getListing);



export default router;