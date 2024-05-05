import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    tenantId: {
        type: String,
        required: true
    },
    tenantName: {
        type: String,
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    propertyName: {
        type: String,
        required: true
    },
    message: {
        type: String
        
    },
    status: {
        type: String,
        default: "pending"
    }

},{timestamps: true})

const RentRequests = mongoose.model('requests',requestSchema)
export default RentRequests;