import express from 'express'
import * as category from './controller/category.controller.js';
import subCategoryRouter from '../subCategory/subCategory.routes.js'
import { validation } from '../../middleware/validation.js';
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from './category.validation.js';
const router = express.Router();

router.use('/:categoryId/subCategories', subCategoryRouter)

router.route('/')
    .post(validation(addCategoryValidation), category.addCategory)
    .get(category.getAllCategories)

router.route('/:id')
    .put(validation(updateCategoryValidation), category.updateCategory)
    .delete(validation(deleteCategoryValidation), category.deleteCategory).get(category.getSpecificCategory)

export default router 