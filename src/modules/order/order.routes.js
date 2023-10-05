import express from 'express'
import * as Order from './controller/order.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();








router.route('/:id')
    .post(protectedRoutes, allowTo('user', 'admin'), Order.createCashOrder)

export default router  