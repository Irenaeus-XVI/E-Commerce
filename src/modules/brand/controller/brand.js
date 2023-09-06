import { brandModel } from '../../../../database/models/brand.model.js'
import slugify from "slugify";
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll } from '../../../utils/helpers/refactor.js';

const addBrand = handleAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)

    const brand = new brandModel(req.body)
    await brand.save()
    res.status(201).json({ message: "success", brand });
});


const getAllBrands = getAll(brandModel, 'brands')



const getSpecificBrand = handleAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const Brand = await brandModel.findById(id)
    !Brand && next(new AppError('Product Not Found.', 404))
    Brand && res.status(201).json({ message: "success", Brand });
});


const updateBrand = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    if (name) req.body.slug = slugify(name)

    const updatedBrand = await brandModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedBrand && next(new AppError('brand  Not Found.', 404));
    updatedBrand && res.status(201).json({ message: "success", updatedBrand });

});



const deleteBrand = deleteOne(brandModel, 'brand');


export {
    addBrand,
    getAllBrands,
    updateBrand,
    getSpecificBrand,
    deleteBrand
}