import express from 'express'
import * as Cart from './controller/cart.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();

router.route('/')
    .post(protectedRoutes, allowTo('user', 'admin'), Cart.addProductToCart)
    .get(Cart.getAllCarts)

router.route('/:id')
    .put(protectedRoutes, allowTo('admin'), Cart.updateCart)
    .delete(allowTo('admin'), Cart.deleteCart)
    .patch(protectedRoutes, allowTo('user', 'admin'), Cart.removeProductFromCart)
    .get(Cart.getSpecificCart)

export default router  