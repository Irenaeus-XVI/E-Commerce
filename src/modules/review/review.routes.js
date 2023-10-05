import express from 'express'
import * as Review from './controller/review.js';
import { validation } from '../../middleware/validation.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
import { addReviewValidation, deleteReviewValidation, updateReviewValidation } from './review.validation.js';
const router = express.Router();

router.route('/')
    .post(validation(addReviewValidation), protectedRoutes, allowTo('user'), Review.addReview)
    .get(Review.getAllReviews)

router.route('/:id')
    .put(validation(updateReviewValidation), protectedRoutes, allowTo('user'), Review.updateReview)
    .delete(validation(deleteReviewValidation), allowTo('admin', 'user'), Review.deleteReview)
    .get(Review.getSpecificReview)

export default router  