import express from 'express'
import * as user from './controller/user.js';
import { validation } from '../../middleware/validation.js';
import { addUserValidation, changeUserPassword, deleteUserValidation, updateUserValidation } from './user.validation.js';
const router = express.Router();

router.route('/')
    .post(validation(addUserValidation), user.addUser)
    .get(user.getAllUsers)

router.route('/:id')
    .put(validation(updateUserValidation), user.updateUser)
    .delete(validation(deleteUserValidation), user.deleteUser)
    .get(user.getSpecificUser)
    .patch(validation(changeUserPassword), user.changeUserPassword)

export default router  