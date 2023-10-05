import express from 'express'
import * as product from './controller/product.js';
import { validation } from '../../middleware/validation.js';
import { addProductValidation, deleteProductValidation, updateProductValidation } from './product.validation.js';
import { uploadMixedFiles } from '../../multer/multer.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();
let productFields = [{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 20 }]
router.route('/')
    .post(protectedRoutes, allowTo('admin', 'user'), uploadMixedFiles(productFields, 'product'), validation(addProductValidation), product.addProduct)
    .get(product.getAllProducts)

router.route('/:id')
    .put(validation(updateProductValidation), product.updateProduct)
    .delete(validation(deleteProductValidation), product.deleteProduct)
    .get(product.getSpecificProduct)

export default router  