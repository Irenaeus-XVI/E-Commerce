import express from 'express'
import * as category from './controller/category.controller.js';
const router = express.Router();

router.route('/').post(category.addCategory).get(category.getAllCategories)
router.route('/:id').put(category.updateCategory).delete(category.deleteCategory)

export default router 