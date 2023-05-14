import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = mongoose.Schema(
  {
    fullName: {
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
    password: {
      type: String,
      required: true,
    },
    photos:{
      type: String,
    },
    gender: {
      type: String,

      default: "",
    },
    address: {
      type: String,

      default: "",
    },
    addressShipping: {
      type: [String],
    },
    country: {
      type: String,

      default: "",
    },
    city: {
      type: String,

      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
        type: String,
        default: "",
    },
    pinCode:{
      type: String,
      default: "",
    },
    verifyCode:{
      type: Boolean,
      default: false,
    },
    store: {
      type: String,
      default: "",
    },
    order: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", UserSchema);
