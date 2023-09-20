import express from 'express'
import * as Review from './controller/review.js';
import { validation } from '../../middleware/validation.js';
import { addReviewValidation, deleteReviewValidation, updateReviewValidation } from './Review.validation.js';
import { protectedRoutes } from '../auth/controller/auth.controller.js';
const router = express.Router();

router.route('/')
    .post(validation(addReviewValidation), protectedRoutes, Review.addReview)
    .get(Review.getAllReviews)

router.route('/:id')
    .put(validation(updateReviewValidation), protectedRoutes, Review.updateReview)
    .delete(validation(deleteReviewValidation), Review.deleteReview)
    .get(Review.getSpecificReview)

export default router  