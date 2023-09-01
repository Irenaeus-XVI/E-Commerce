import { categoryModel } from '../../../../database/models/category.model.js'
import slugify from "slugify";

export const addCategory = async (req, res, next) => {
    let { name } = req.body;
    const category = await categoryModel.insertMany({ name, slug: slugify(name) });
    res.status(201).json({ message: "success", category });
}  