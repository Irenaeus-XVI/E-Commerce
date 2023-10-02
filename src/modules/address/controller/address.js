import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { userModel } from '../../../../database/models/user.model.js';



const addToAddress = handleAsyncError(async (req, res, next) => {

    const address = await userModel.findOneAndUpdate({ _id: req.user._id }, {
        $addToSet: {
            address: req.body
        }
    }, { new: true })
    !address && next(new AppError('user Not Found', 404));
    address && res.status(201).json({ message: "success", address });

})


const deleteFromAddress = handleAsyncError(async (req, res, next) => {



    const address = await userModel.findOneAndUpdate({ _id: req.user._id }, {
        $pull: {
            address: { _id: req.body.address }
        }
    }, { new: true }).select('address')

    !address && next(new AppError('user Not Found', 404));
    address && res.status(201).json({ message: "success", address });

})



const getAllAddress = handleAsyncError(async (req, res, next) => {


    const address = await userModel.findOne({ _id: req.user._id }).select("address").populate("address")

    !address && next(new AppError('user Not Found', 404));
    address && res.status(201).json({ message: "success", address });

})

export {
    addToAddress,
    deleteFromAddress,
    getAllAddress
}