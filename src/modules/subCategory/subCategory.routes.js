import express from 'express'
import * as subCategory from './controller/subCategory.js';
const router = express.Router();

router.route('/').post(subCategory.addSubCategory).get(subCategory.getAllCategories)
router.route('/:id').put(subCategory.updateSubCategory).delete(subCategory.deleteSubCategory)

export default router  