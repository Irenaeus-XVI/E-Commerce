import express from 'express'
import * as product from './controller/product.js';
const router = express.Router();

router.route('/').post(product.addProduct).get(product.getAllProducts)
router.route('/:id').put(product.updateProduct).delete(product.deleteProduct).get(product.getSpecificProduct)

export default router  