import express from 'express'
import * as category from './controller/category.controller.js';
const router = express.Router();

router.post("/", category.addCategory)

export default router