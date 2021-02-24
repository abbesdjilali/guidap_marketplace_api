const Joi = require('joi');

const LeisureCentreSchema = Joi.object({

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
    categories: Joi.array().items(Joi.string())
})

module.exports.LeisureCentreSchema = LeisureCentreSchema;