import { brandModel } from '../../../../database/models/brand.model.js'
import slugify from "slugify";
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';

const addBrand = handleAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)

    const brand = new brandModel(req.body)
    await brand.save()
    res.status(201).json({ message: "success", brand });
});


const getAllBrands = handleAsyncError(async (req, res, next) => {
    const brands = await brandModel.find()
    res.status(201).json({ message: "success", brands });
});



const updateBrand = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    if (name) req.body.slug = slugify(name)

    const updatedBrand = await brandModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedBrand && next(new AppError('brand  Not Found.', 404));
    updatedBrand && res.status(201).json({ message: "success", updatedBrand });

});



const deleteBrand = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    const deletedBrand = await brandModel.findByIdAndDelete(id);
    console.log(deletedBrand);
    !deletedBrand && next(new AppError('brand Not Found.', 404));
    deletedBrand && res.status(201).json({ message: "success", deletedBrand });

});


export {
    addBrand,
    getAllBrands,
    updateBrand,
    deleteBrand
}