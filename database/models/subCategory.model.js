import { Schema, Types, model } from "mongoose";



const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, 'to short subCategory name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: Types.ObjectId,
        required: true,
        ref: "category"
    }
}, { timestamps: true });


export const subCategoryModel = model('subCategory', subCategorySchema);