import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';

import { createRequest,serviceRequest,getRequests,getTenants} from '../controller/request.controller.js';
const router = express.Router();
router.post('/rent',verifyToken,createRequest); // create rend request
router.post('/service/:id',serviceRequest); // rent request
router.post('/get',getRequests)      // fetch all tthe rent requests
router.post('/getTenants',getTenants) // fetch tenants for particular owner


export default router;
