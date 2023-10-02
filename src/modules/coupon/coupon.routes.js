import express from 'express'
import * as coupon from './controller/coupon.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();

router.route('/')
    .post(protectedRoutes, allowTo('admin'), coupon.addCoupon)
    .get(coupon.getAllCoupons)

router.route('/:id')
    .put(protectedRoutes, allowTo('admin'), coupon.updateCoupon)
    .delete(protectedRoutes, allowTo('admin'), coupon.deleteCoupon)
    .get(coupon.getSpecificCoupon)

export default router  