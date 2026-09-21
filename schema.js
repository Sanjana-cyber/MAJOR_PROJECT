const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),

        description: Joi.string().required(),

        image: Joi.object({
            filename:Joi.string().allow(""),
            url:Joi.string().allow(""),

        }).allow("", null),

        price: Joi.number().required().min(0),

        location: Joi.string().required(),

        country: Joi.string().required()
    }).required()
});

module.exports = { listingSchema };