import express from 'express'
import { test,updateUserInfo,deleteUser} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getUserListing } from '../controller/listing.controller.js';

const router = express.Router();

router.get('/test' ,test)
router.post('/update/:id',verifyToken,updateUserInfo)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListing)

export default router;