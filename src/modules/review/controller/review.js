import { reviewModel } from '../../../../database/models/review.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';
import { productModel } from '../../../../database/models/product.model.js'

const addReview = handleAsyncError(async (req, res, next) => {


    //NOTE - check product 
    const product = await productModel.findOne({ _id: req.body.product })
    if (!product) return next(new AppError('Product Not Found.', 409))

    //NOTE - Take Id from token 
    req.body.user = req.user._id
    //NOTE - Check if review added to the product before or not!
    const review = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    if (review) return next(new AppError('Already have review', 409))
    const Review = new reviewModel(req.body)
    await Review.save()
    res.status(201).json({ message: "success", Review });
});


const getAllReviews = getAll(reviewModel, 'Reviews')


const getSpecificReview = getSpecific(reviewModel, 'Review')

const updateReview = handleAsyncError(async (req, res, next) => {
    //NOTE - Take userId from token 
    //NOTE - req.body.user = req.user._id
    //NOTE - Review id
    const { id } = req.params
    const updatedReview = await reviewModel.findOneAndUpdate({ user: req.user._id, _id: id }, req.body, { new: true })
    !updatedReview && next(new AppError('Review  Not Found Or You Are Not Authorized.', 404));
    updatedReview && res.status(201).json({ message: "success", updatedReview });

});



const deleteReview = deleteOne(reviewModel, 'Review');


export {
    addReview,
    getAllReviews,
    updateReview,
    getSpecificReview,
    deleteReview
}