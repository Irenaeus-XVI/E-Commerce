import mongoose, { Schema, Types, model } from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    }
    ,
    changeUserPasswordAt: {
        type: Date,
        default: 0
    },
    wishList: [{
        type: Types.ObjectId,
        ref: "product"
    }],
    address: [{
        city: String,
        street: String,
        phone: String
    }]
}, { timestamps: true });

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, Number(process.env.SALT_ROUNDS))
})

userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, Number(process.env.SALT_ROUNDS))
})


export const userModel = model('user', userSchema);