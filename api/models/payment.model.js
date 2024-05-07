import mongoose from "mongoose";

function getDefaultPaymentDate() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  return new Date(currentYear, currentMonth, 10);
}


// Custom function to get the 28th day of the current month

function getDefaultDueDate() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  return new Date(currentYear, currentMonth, 28);
}

const paymentSchema = new mongoose.Schema({
   tenantName: {
    type: String
   },
   tenantId: {
    type: String
   },
   ownerId: {
    type: String
   },
   paymentDate: {
    type: Date,

   },
   dueDate: {
    type: Date,
    default: getDefaultDueDate
   },
   done: {
    type: Boolean,
    default: false
   }
},{timestamps: true})

paymentSchema.statics.existsWithinMonth = async function(tenantId, paymentDate) {
  const startOfMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), 1);
  const endOfMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth() + 1, 0);

  const count = await this.countDocuments({
      tenantId: tenantId,
      paymentDate: {
          $gte: startOfMonth,
          $lte: endOfMonth
      }
  });

  return count > 0;
};

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
