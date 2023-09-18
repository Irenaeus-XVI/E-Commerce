import { productModel } from '../../../../database/models/product.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';

const addProduct = handleAsyncError(async (req, res, next) => {
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(image => image.filename)
    const product = new productModel(req.body)
    await product.save()
    res.status(201).json({ message: "success", product });
});


const getAllProducts = getAll(productModel, 'Products')


const getSpecificProduct = getSpecific(productModel, 'Product')


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