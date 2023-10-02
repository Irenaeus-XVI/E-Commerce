import express from 'express'
import * as Address from './controller/address.js';
import { protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();

router.patch("/", protectedRoutes, Address.addToAddress)
router.delete("/", protectedRoutes, Address.deleteFromAddress)
router.get("/", protectedRoutes, Address.getAllAddress)
export default router  