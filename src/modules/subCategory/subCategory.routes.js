import express from 'express'
import * as subCategory from './controller/subCategory.js';
import { validation } from '../../middleware/validation.js';
import { addSubCategoryValidation, deleteSubCategoryValidation, updateSubCategoryValidation } from './subCategory.validation.js';
const router = express.Router({ mergeParams: true });

router.route('/')
    .post(validation(addSubCategoryValidation), subCategory.addSubCategory)
    .get(subCategory.getAllSubCategories)

router.route('/:id')
    .put(validation(updateSubCategoryValidation), subCategory.updateSubCategory)
    .delete(validation(deleteSubCategoryValidation), subCategory.deleteSubCategory)
    .get(subCategory.getSpecificSubCategory)

export default router  