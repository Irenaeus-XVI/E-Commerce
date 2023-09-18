import Joi from "joi";



const addUserValidation =
    Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        phone: Joi.string().required()

    })




const updateUserValidation =
    Joi.object({
        name: Joi.string().min(2),
        id: Joi.string().hex().length(24).required()
    })


const deleteUserValidation =
    Joi.object({
        id: Joi.string().hex().length(24).required()
    })

export {
    addUserValidation,
    updateUserValidation,
    deleteUserValidation
}