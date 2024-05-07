import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String ,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number ,
        required: true

    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    furnished: {
        type: Boolean ,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    imageUrls: {
        type: Array,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
    tenantId: {
        type: String,
        default: 'none'
    },
    tenantName: {
        type: String,
        default: 'none'
    },
    tenantEmail: {
        type: String,
        default: 'none'
    },
    occupied: {
        type: Boolean,
        default: false
    },
    city: {
        type: String 
    },
    country: {
        type: String
    }
},{timestamps: true})

const Listing = mongoose.model('Listing',listingSchema)

export default Listing;