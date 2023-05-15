import mongoose from "mongoose";

const {Schema} = mongoose;

const ProductSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    rating: {
        type: String,
        // required: true,
    },
    qualified: {
        type: Number,
        required: true,
    },
    sortdesc: {
        type: String,
        required: true,
    },
    weight: {
        type: [String],
        required: true,
    },
    desc: {
        type: String,
        // required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    reviews: {
        type: [String],
    },
    photos: {
        type: [String],
        default: ["https://res.cloudinary.com/dthybdbt9/image/upload/v1684126205/imagenotfound_r0puxe.jpg"]
    },
    sales:{
        type: Number,
        default: 0
    },
    customers:{
        type: [String],
    },
    
    comments:{
        type: [String],
    },

})


export default mongoose.model("Products", ProductSchema)