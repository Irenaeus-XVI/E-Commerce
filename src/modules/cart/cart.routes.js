import express from 'express'
import * as Cart from './controller/cart.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();

router.route('/')
    .post(protectedRoutes, allowTo('user', 'admin'), Cart.addProductToCart)
    .get(protectedRoutes, allowTo('user', 'admin'), Cart.getLoggedUserCart)
    .delete(protectedRoutes, allowTo('admin', 'user'), Cart.deleteUserCart)

router.post('/applyCoupon', protectedRoutes, allowTo('user', 'admin'), Cart.applyCoupon)

router.route('/:id')
    .put(protectedRoutes, allowTo('admin', 'user'), Cart.updateProductQuantity)
    .patch(protectedRoutes, allowTo('user', 'admin'), Cart.removeProductFromCart)

export default router  