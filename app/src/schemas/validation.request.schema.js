const Joi = require('joi');
exports.LeisureCentreSchema = Joi.object({
    centreName: Joi.string()
        .min(3)
        .max(255)
        .required(),
    description: Joi.string(),
    website: Joi.string(),
    addressName: Joi.string().min(6).max(255).required(),
    cite: Joi.string().min(4).max(25).required(),
    zipCode: Joi.number().required(),
    country : Joi.string().required(),
    categories: Joi.array().items(Joi.number()).min(1).required()
})

exports.UpdateLeisureCentreSchema = Joi.object({
    centreName: Joi.string()
        .min(3)
        .max(255),
    description: Joi.string(),
    website: Joi.string(),
    addressName: Joi.string().min(6).max(255),
    cite: Joi.string().min(4).max(25),
    zipCode: Joi.number(),
    country: Joi.string(),
    categories: Joi.array().items(Joi.number()).min(1)
})

exports.User = Joi.object({
    userName: Joi.string()
        .min(3)
        .max(25)
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
    passwordConfirmation: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('passwordConfirmation')
        .options({
            messages: {
                'any.only': '{{#label}} does not match'
            }
        })
})


