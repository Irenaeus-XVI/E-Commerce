import { productModel } from '../../../../database/models/product.model.js'
import slugify from "slugify";
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne } from '../../../utils/helpers/refactor.js';

const addProduct = handleAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)

    const product = new productModel(req.body)
    await product.save()
    res.status(201).json({ message: "success", product });
});


const getAllProducts = handleAsyncError(async (req, res, next) => {

    //NOTE - pagination
    const limit = 5;
    //NOTE - if there is no page given or given string value 
    let page = req.query.page * 1 || 1
    //NOTE - if page value <=0
    if (page <= 0) page = 1
    const skip = (page - 1) * limit;
    console.log(page);
    //NOTE - filter
    filtration
    let filterObg = req.query;
    let excludedQuery = ['page', 'sort', 'fields', 'keyword'];
    excludedQuery.forEach(q => {
        delete filterObg[q];
    });

    filterObg = JSON.stringify(filterObg);
    filterObg = filterObg.replace(/(gt|gte|let|lte)/g, match => `$ ${match}`)
    filterObg = JSON.parse(filterObg);
    console.log(filterObg);
    const products = await productModel.find(filterObg).skip(skip).limit(limit)
    res.status(201).json({ page: +page, message: "success", products });
});



const getSpecificProduct = handleAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const product = await productModel.findById(id)
    !product && next(new AppError('Product Not Found.', 404))
    product && res.status(201).json({ message: "success", product });
});



const updateProduct = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let { title } = req.body;
    if (title) req.body.slug = slugify(title)

    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedProduct && next(new AppError('product  Not Found.', 404));
    updatedProduct && res.status(201).json({ message: "success", updatedProduct });

});



const deleteProduct = deleteOne(productModel, 'product');


export {
    addProduct,
    getAllProducts,
    updateProduct,
    getSpecificProduct,
    deleteProduct
}