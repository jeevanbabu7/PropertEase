import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing,deleteProperty, updateProperty} from '../controller/listing.controller.js';
const router = express.Router();

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteProperty);
router.post('/update/:id',verifyToken,updateProperty)
export default router;