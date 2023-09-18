import { Schema, Types, model } from "mongoose";
import slugify from "slugify";



const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [2, 'to short subCategory name']
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

subCategorySchema.pre('save', function () {
    this.slug = slugify(this.name)
})

export const subCategoryModel = model('subCategory', subCategorySchema);