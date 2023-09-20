import Joi from "joi";



const addReviewValidation =
    Joi.object({
        text: Joi.string().min(2).required(),
        product: Joi.string().hex().length(24).required(),
        rate: Joi.number().required(),
    })




const updateReviewValidation =
    Joi.object({
        text: Joi.string().min(2),
        rate: Joi.number(),
        id: Joi.string().hex().length(24).required()
    })


const deleteReviewValidation =
    Joi.object({
        id: Joi.string().hex().length(24).required()
    })

export {
    addReviewValidation,
    updateReviewValidation,
    deleteReviewValidation
}