import Joi from "joi";



const addProductValidation =
    Joi.object({
        title: Joi.string().min(2).required(),
        price: Joi.number().required(),
        description: Joi.string().min(5).required(),
        stock: Joi.number().required(),
        category: Joi.string().hex().length(24).required(),
        subCategory: Joi.string().hex().length(24).required(),
        brand: Joi.string().hex().length(24).required(),
    })




const updateProductValidation =
    Joi.object({
        title: Joi.string().min(2),
        id: Joi.string().hex().length(24).required()
    })


const deleteProductValidation =
    Joi.object({
        id: Joi.string().hex().length(24).required()
    })

export {
    addProductValidation,
    updateProductValidation,
    deleteProductValidation
}