import { Schema, model } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, 'to short category name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: {
        type: String,
    }
}, { timestamps: true });


export const categoryModel = model('category', categorySchema);