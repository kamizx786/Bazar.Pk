const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*#])[A-Za-z\d@$!%^*#]+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@, $, !, %, ^, *, #)",
    }),
});
const loginValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
});

const forgotValidation = Joi.object({
  email: Joi.string().email().required(),
});

const forgotCompleteValidation = Joi.object({
  email: Joi.string().email().required(),
  Newpassword: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])"))
    .required(),
  secret: Joi.string().required(),
});

const registerCompleteValidation = Joi.object({
  email: Joi.string().email().required(),
  secret: Joi.string().required(),
});
module.exports = {
  registerValidation,
  registerCompleteValidation,
  loginValidation,
  forgotValidation,
  forgotCompleteValidation,
};
