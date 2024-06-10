const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ProjectValidator {
    async projectCreateValidation(req, res, next) {
        // create schema object
        // const schema = Joi.object({
        //     email: Joi.string().email().required(),
        //     password: Joi.string().min(6).required()
        // });

        const plotSchema = Joi.object({
            plotId: Joi.string().required(),
            plotNumber: Joi.string().required(),
            investor: Joi.number().integer().min(1).required(),
            investAmount: Joi.number().precision(2).required(),
            dueAmount: Joi.number().precision(2).required(),
            sellPrice: Joi.number()
        });

        // Define the Joi schema for the main object
        const schema = Joi.object({
            projectName: Joi.string().required(),
            address: Joi.string().required(),
            area: Joi.number().precision(2).required(),
            unitPrice: Joi.number().precision(2).required(),
            totalPrice: Joi.number().precision(2).required(),
            sellingPrice: Joi.number(),
            plots: Joi.array().items(plotSchema)
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }
}

module.exports = ProjectValidator;
