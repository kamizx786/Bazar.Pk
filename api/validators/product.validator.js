const Joi = require("joi");

const productValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  gallery_pics: Joi.array()
    .items(
      Joi.object({
        url: Joi.string(),
        publicId: Joi.string(),
      })
    )
    .min(3)
    .required(),
  feature_pic: Joi.object({
    url: Joi.string(),
    publicId: Joi.string(),
  }),
  category: Joi.string(),
  store: Joi.string(),
  salePrice: Joi.number()
    .greater(Joi.ref("purchasePrice"))
    .min(1)
    .messages({ "number.base": "Sale price must be a number" })
    .required(),
  purchasePrice: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
  unit: Joi.string(),
});

module.exports = { productValidation };
