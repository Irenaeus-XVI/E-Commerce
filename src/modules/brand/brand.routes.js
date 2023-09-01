import express from 'express'
import * as brand from './controller/brand.js';
const router = express.Router();

router.route('/').post(brand.addBrand).get(brand.getAllBrands)
router.route('/:id').put(brand.updateBrand).delete(brand.deleteBrand)

export default router  