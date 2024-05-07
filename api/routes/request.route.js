import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';


//lease requests
import { createRequest,serviceRequest,getRequests,getTenants} from '../controller/request.controller.js';
// maintenance
import { getPropertyDetails,createMaintanenceRequest, getMaintanenceRequest,getMaintenanceDetails,getMaintanenceRequestOwner
} from '../controller/request.controller.js';

const router = express.Router();

//lease...
router.post('/rent',verifyToken,createRequest); // create rend request
router.post('/service/:id',serviceRequest); // rent request
router.post('/get',getRequests)      // fetch all tthe rent requests
router.post('/getTenants',getTenants) // fetch tenants for particular owner


// maintenance....................
router.get('/getdetails/:tenantId',getPropertyDetails);
router.post('/maintenance/create',createMaintanenceRequest)
router.get('/maintenance/user/get/:tenantId',getMaintanenceRequest)
router.get('/maintenance/owner/get/:ownerId',getMaintanenceRequestOwner)
router.get('/maintenance/get/:requestId',getMaintenanceDetails)


// router.post('/vacate/:tenantId',vacate)


export default router;
