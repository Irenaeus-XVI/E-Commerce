import { categoryModel } from '../../../../database/models/category.model.js'
import slugify from "slugify";
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';

const addCategory = handleAsyncError(async (req, res, next) => {
    console.log(req.file);
    let { name } = req.body;
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename 
    const category = new categoryModel(req.body)
    await category.save()
    res.status(201).json({ message: "success", category });
});


const getAllCategories = getAll(categoryModel, 'categories')


const getSpecificCategory = getSpecific(categoryModel, 'Category')


const updateCategory = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    if (name) req.body.slug = slugify(name)
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedCategory && next(new AppError('Category Not Found.', 404));
    updatedCategory && res.status(201).json({ message: "success", updatedCategory });

});



const deleteCategory = deleteOne(categoryModel, 'category');


export {
    addCategory,
    getAllCategories,
    updateCategory,
    getSpecificCategory,
    deleteCategory
}