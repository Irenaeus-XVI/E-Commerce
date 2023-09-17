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

categorySchema.post('init', (doc) => {
    doc.image = "http://localhost:4000/category/" + doc.image
})


export const categoryModel = model('category', categorySchema);