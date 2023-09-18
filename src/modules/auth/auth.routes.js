import express from 'express'
import * as auth from './controller/auth.controller.js';
import { validation } from '../../middleware/validation.js';
import { signInValidation, signUpValidation } from './auth.validation.js';
const router = express.Router();

router.post('/signUp', validation(signUpValidation), auth.signUp)
router.post('/signIn', validation(signInValidation), auth.signIn)


export default router  