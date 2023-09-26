import { reviewModel } from '../../../../database/models/review.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';
import { productModel } from '../../../../database/models/product.model.js'
import { userModel } from '../../../../database/models/user.model.js';



const addToWishList = handleAsyncError(async (req, res, next) => {



    const { product } = req.body
    const wishList = await userModel.findOneAndUpdate({ _id: req.user._id }, {
        $addToSet: {
            wishList: product
        }
    }, { new: true })

    !wishList && next(new AppError('user Not Found', 404));
    wishList && res.status(201).json({ message: "success", wishList });

})


const deleteFromWishList = handleAsyncError(async (req, res, next) => {



    const { product } = req.body
    const wishList = await userModel.findOneAndUpdate({ _id: req.user._id }, {
        $pull: {
            wishList: product
        }
    }, { new: true })

    !wishList && next(new AppError('user Not Found', 404));
    wishList && res.status(201).json({ message: "success", wishList });

})



const getAllWishList = handleAsyncError(async (req, res, next) => {



    const wishList = await userModel.findOne({ _id: req.user._id }).select("wishList").populate("wishList")

    !wishList && next(new AppError('user Not Found', 404));
    wishList && res.status(201).json({ message: "success", wishList });

})

export {
    addToWishList,
    deleteFromWishList,
    getAllWishList
}