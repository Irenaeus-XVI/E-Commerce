import express from 'express'
import * as Order from './controller/order.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();




router.route('/')
    .get(protectedRoutes, allowTo('admin'), Order.getAllOrders)


router.route('/user')
    .get(protectedRoutes, allowTo('user', 'admin'), Order.getUserOrders)


router.route('/:id')
    .post(protectedRoutes, allowTo('user'), Order.createCashOrder)

export default router  