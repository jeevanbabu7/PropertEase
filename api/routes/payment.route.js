import { getUserData,checkPayment,payRent,getPaymentHistory} from "../controller/paymentcontroller.js";
import express from 'express'

const router = express.Router();


router.get('/getUserInfo/:id',getUserData); // used to find whether the current user have a home
router.get('/checkpayment/:id',checkPayment); // find whether the rent is already payed
router.post('/pay',payRent); // pay rent for current month
router.get('/history/get/:id',getPaymentHistory); // get payment history
export default router;
