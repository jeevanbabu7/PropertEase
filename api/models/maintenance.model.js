import mongoose from "mongoose";

const maintanenceSchema = new mongoose.Schema({
    tenantId: {
        type: String,
    },
    tenantName: {
        type: String,
    },
    propertyId: {
        type: String,
    },
    propertyName: {
        type: String,
    },
    ownerId: {
        type: String
    },
    solved: {
        type: Boolean
    },
    message: {
        type: String
    },
    images: {
        type: Array
    }
},{timestamps: true})

const Maintenance = mongoose.model('Maintenance',maintanenceSchema)

export default Maintenance;