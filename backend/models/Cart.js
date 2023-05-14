import mongoose from "mongoose";

const {Schema} = mongoose;

const CartSchema = mongoose.Schema({
    productInCart:{
        type: [String],
        required: true
    },
    subTotal: {
        type: String,
        required: true
    }
    ,
    Total: {
        type: String,
        required: true
    }
    ,
    shipPing: {
        type: String,
        required: true
    }
    ,
    address: {
        type: [String],
        required: true
    }
    ,
    deliveryOption: {
        type: String,
        required: true
    }
    ,
    PaymentOption: {
        type: String,
        required: true
    }
    ,
    status: {
        type: String,
        default: 'PENDING'

    },
    cartCode: {
        type: String,
        default: ""
    }
},
{
  timestamps: true,
});

export default mongoose.model("Cart", CartSchema);
