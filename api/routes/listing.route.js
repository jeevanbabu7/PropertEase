import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing,deleteProperty, updateProperty,propertyDetails} from '../controller/listing.controller.js';
const router = express.Router();

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteProperty);
router.post('/update/:id',verifyToken,updateProperty) // update property data
router.get('/property/:id',verifyToken,propertyDetails); // fetch info about single property
export default router;