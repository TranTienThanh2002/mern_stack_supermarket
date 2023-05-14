import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,

    default: "",
  },
  type:{
    type: String,
    default: "home",
  },
  phone:{
    type: String,
    default: "",
  },
  pinCode: {
    type: String,
    default: "",
  },
},
{
  timestamps: true,
});

export default mongoose.model("Address", AddressSchema);
