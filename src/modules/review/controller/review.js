import { reviewModel } from '../../../../database/models/review.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';

const addReview = handleAsyncError(async (req, res, next) => {

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
    // req.body.user = req.user._id
    //NOTE - Review id
    const { id } = req.params
    const updatedReview = await reviewModel.findOne({ user: req.user._id, _id: id }, req.body, { new: true })
    !updatedReview && next(new AppError('Review  Not Found.', 404));
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