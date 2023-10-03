import express from 'express'
import * as Cart from './controller/cart.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();

router.route('/')
    .post(protectedRoutes, allowTo('admin'), Cart.addProductToCart)
    .get(Cart.getAllCarts)

router.route('/:id')
    .put(protectedRoutes, allowTo('admin'), Cart.updateCart)
    .delete(allowTo('admin'), Cart.deleteCart)
    .get(Cart.getSpecificCart)

export default router  