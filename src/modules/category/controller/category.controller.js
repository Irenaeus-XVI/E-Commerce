import { categoryModel } from '../../../../database/models/category.model.js'
import slugify from "slugify";

const addCategory = async (req, res, next) => {
    let { name } = req.body;
    req.body.slug = slugify(req.body.name)
    const category = new categoryModel(req.body)
    await category.save()
    res.status(201).json({ message: "success", category });
}


const getAllCategories = async (req, res, next) => {
    const categories = await categoryModel.find()
    res.status(201).json({ message: "success", categories });
}



const updateCategory = async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    if (name) req.body.slug = slugify(name)
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, req.body, { new: true })
    res.status(201).json({ message: "success", updatedCategory });

}



const deleteCategory = async (req, res, next) => {
    let { id } = req.params;
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    console.log(deletedCategory);
    !deletedCategory && res.status(404).json({ message: "Category Not Found." });
    deletedCategory && res.status(201).json({ message: "success", deletedCategory });

}
export {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}