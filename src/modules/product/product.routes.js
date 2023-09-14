import express from 'express'
import * as product from './controller/product.js';
import { validation } from '../../middleware/validation.js';
import { addProductValidation, deleteProductValidation, updateProductValidation } from './product.validation.js';
const router = express.Router();

router.route('/')
    .post(validation(addProductValidation), product.addProduct)
    .get(product.getAllProducts)

router.route('/:id')
    .put(validation(updateProductValidation), product.updateProduct)
    .delete(validation(deleteProductValidation), product.deleteProduct)
    .get(product.getSpecificProduct)

export default router  