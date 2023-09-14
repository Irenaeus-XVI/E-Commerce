import express from 'express'
import * as brand from './controller/brand.js';
import { validation } from '../../middleware/validation.js';
import { addBrandValidation, deleteBrandValidation, updateBrandValidation } from './brand.validation.js';
const router = express.Router();

router.route('/')
    .post(validation(addBrandValidation), brand.addBrand)
    .get(brand.getAllBrands)

router.route('/:id')
    .put(validation(updateBrandValidation), brand.updateBrand)
    .delete(validation(deleteBrandValidation), brand.deleteBrand)
    .get(brand.getSpecificBrand)

export default router  