import { subCategoryModel } from '../../../../database/models/subCategory.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { categoryModel } from '../../../../database/models/category.model.js';
import { deleteOne, getSpecific } from '../../../utils/helpers/refactor.js';

const addSubCategory = handleAsyncError(async (req, res, next) => {
    const { category } = req.body
    const categoryExist = await categoryModel.findById(category)
    if (!categoryExist) {
        return next(new AppError('Category Not Found.', 404));
    }
    const subCategory = new subCategoryModel(req.body)
    await subCategory.save()
    res.status(201).json({ message: "success", subCategory });
});


const getAllSubCategories = handleAsyncError(async (req, res, next) => {
    const { categoryId } = req.params
    let filter = {}
    if (categoryId) filter = { category: req.params.categoryId }
    const categories = await subCategoryModel.find(filter)
    res.status(201).json({ message: "success", categories });
});


const getSpecificSubCategory = getSpecific(subCategoryModel, 'subCategory')


const updateSubCategory = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    if (name) req.body.slug = slugify(name)
    // const { category } = req.body
    // const categoryExist = await categoryModel.findById(category)
    // if (!categoryExist) {
    //     return next(new AppError('Category Not Found.', 404));
    // }
    const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedSubCategory && next(new AppError('subCategory  Not Found.', 404));
    updatedSubCategory && res.status(201).json({ message: "success", updatedSubCategory });

});



const deleteSubCategory = deleteOne(subCategoryModel, 'subCategory')


export {
    addSubCategory,
    getAllSubCategories,
    updateSubCategory,
    getSpecificSubCategory,
    deleteSubCategory
}