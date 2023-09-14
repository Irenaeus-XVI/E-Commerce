import Joi from "joi";



const addBrandValidation =
    Joi.object({
        name: Joi.string().min(2).required()
    })




const updateBrandValidation =
    Joi.object({
        name: Joi.string().min(2),
        id: Joi.string().hex().length(24).required()
    })


const deleteBrandValidation =
    Joi.object({
        id: Joi.string().hex().length(24).required()
    })

export {
    addBrandValidation,
    updateBrandValidation,
    deleteBrandValidation
}