import mongoose, { Schema, Types, model } from "mongoose";



const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    cartItems: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "product"
        },
        quantity: { type: Number },
        price: Number,
    }],
    totalOrderPrice: Number,
    shippingAddress: {
        type: String,
        city: String,
        phone: String
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
}, { timestamps: true });


export const orderModel = model('order', orderSchema);