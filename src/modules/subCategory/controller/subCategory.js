import { subCategoryModel } from '../../../../database/models/subCategory.model.js'
import slugify from "slugify";
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { categoryModel } from '../../../../database/models/category.model.js';

const addSubCategory = handleAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const { category } = req.body
    const categoryExist = await categoryModel.findById(category)
    if (!categoryExist) {
        return next(new AppError('Category Not Found.', 404));
    }
    const subCategory = new subCategoryModel(req.body)
    await subCategory.save()
    res.status(201).json({ message: "success", subCategory });
});


const getAllCategories = handleAsyncError(async (req, res, next) => {
    const categories = await subCategoryModel.find()
    res.status(201).json({ message: "success", categories });
});



const updateSubCategory = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    if (name) req.body.slug = slugify(name)
    const { category } = req.body
    const categoryExist = await categoryModel.findById(category)
    if (!categoryExist) {
        return next(new AppError('Category Not Found.', 404));
    }
    const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedSubCategory && next(new AppError('subCategory  Not Found.', 404));
    updatedSubCategory && res.status(201).json({ message: "success", updatedSubCategory });

});



const deleteSubCategory = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    const deletedSubCategory = await subCategoryModel.findByIdAndDelete(id);
    console.log(deletedSubCategory);
    !deletedSubCategory && next(new AppError('subCategory  Not Found.', 404));
    deletedSubCategory && res.status(201).json({ message: "success", deletedSubCategory });

});


export {
    addSubCategory,
    getAllCategories,
    updateSubCategory,
    deleteSubCategory
}