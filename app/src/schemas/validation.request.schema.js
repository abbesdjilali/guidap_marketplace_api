const Joi = require('joi');
const j2s = require('joi-to-swagger');

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
    categories: Joi.array().items(Joi.string()).min(1).required()
})

const UpdateLeisureCentreSchema = Joi.object({
    centreName: Joi.string()
        .min(3)
        .max(255),
    description: Joi.string(),
    website: Joi.string(),
    addressName: Joi.string().min(6).max(255),
    cite: Joi.string().min(4).max(25),
    zipCode: Joi.number(),
    country: Joi.string()
})
const {swagger,components} = j2s(LeisureCentreSchema);
exports.LeisureCentreSwaggerSchema = swagger;
module.exports.LeisureCentreSchema = LeisureCentreSchema;
module.exports.UpdateLeisureCentreSchema = UpdateLeisureCentreSchema;