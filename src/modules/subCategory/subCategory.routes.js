import express from 'express'
import * as subCategory from './controller/subCategory.js';
const router = express.Router({ mergeParams: true });

router.route('/').post(subCategory.addSubCategory).get(subCategory.getAllSubCategories)
router.route('/:id').put(subCategory.updateSubCategory).delete(subCategory.deleteSubCategory).get(subCategory.getSpecificSubCategory)

export default router  