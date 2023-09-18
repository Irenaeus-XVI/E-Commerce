import { userModel } from '../../../../database/models/user.model.js'
import slugify from "slugify";
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';

const addUser = handleAsyncError(async (req, res, next) => {

    const user = new userModel(req.body)
    await user.save()
    res.status(201).json({ message: "success", user });
});


const getAllUsers = getAll(userModel, 'users')


const getSpecificUser = getSpecific(userModel, 'user')

const updateUser = handleAsyncError(async (req, res, next) => {
    let { id } = req.params;

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true })
    !updatedUser && next(new AppError('user  Not Found.', 404));
    updatedUser && res.status(201).json({ message: "success", updatedUser });

});



const deleteUser = deleteOne(userModel, 'user');


export {
    addUser,
    getAllUsers,
    updateUser,
    getSpecificUser,
    deleteUser
}