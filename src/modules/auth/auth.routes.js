import express from 'express'
import * as auth from './controller/auth.controller.js';
import { validation } from '../../middleware/validation.js';
import { signUpValidation } from './auth.validation.js';
const router = express.Router();

router.post('/signUp', validation(signUpValidation), auth.signUp)

 
export default router  