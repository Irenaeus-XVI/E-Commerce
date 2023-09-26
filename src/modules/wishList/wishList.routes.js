import express from 'express'
import * as wishList from './controller/wishList.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();

router.patch("/", protectedRoutes, wishList.addToWishList)
router.delete("/", protectedRoutes, wishList.deleteFromWishList)
router.get("/", protectedRoutes, wishList.getAllWishList)
export default router  