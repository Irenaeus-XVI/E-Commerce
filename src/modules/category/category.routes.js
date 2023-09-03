import express from 'express'
import * as category from './controller/category.controller.js';
import subCategoryRouter from '../subCategory/subCategory.routes.js'
const router = express.Router();

router.use('/:categoryId/subCategories', subCategoryRouter)
router.route('/').post(category.addCategory).get(category.getAllCategories)
router.route('/:id').put(category.updateCategory).delete(category.deleteCategory).get(category.getSpecificCategory)

export default router 