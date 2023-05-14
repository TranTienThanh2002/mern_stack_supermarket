import mongoose from "mongoose";

const { Schema } = mongoose;

const StoreSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: false,
    },
    
    photos:{
      type: String,
    },
    
    address: {
      type: String,
      default: "",
    },
    
    country: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    yearEstablished:{
        type: String,
        default: "",
    },
    zip:{
      type: String,
      default: "",
    },
    order: {
      type: [String],
    }
    ,
    product: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Store", StoreSchema);
