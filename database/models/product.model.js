import { Schema, Types, model } from "mongoose";



const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [2, 'to short product name']

    },
    slug: {
        type: String,
        lowercase: true
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        minLength: [10, ' product description too short'],
        maxLength: [100, 'product description too long'],
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    sold: {
        type: Number,
        default: 0,
        min: 0
    },
    imageCover: {
        type: String,
        default: null
    },
    images: {
        type: [String],
    },
    category: {
        type: Types.ObjectId,
        ref: "category",
        required: true
    },
    subCategory: {
        type: Types.ObjectId,
        ref: "subCategory",
        required: true
    },
    brand: {
        type: Types.ObjectId,
        ref: "brand",
        required: true
    },
    ratingAvg: {
        type: Number,
        default: null,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: Number,
        min: 0,
    },
}, { timestamps: true });

productSchema.post('init', (doc) => {
    doc.imageCover = "http://localhost:4000/product/" + doc.imageCover

    doc.images = doc.images.map(image => "http://localhost:4000/product/" + image
    )
})
export const productModel = model('product', productSchema);