const Joi = require("joi");

const productValidation = Joi.object({
  name: Joi.string().required(),
  discription: Joi.string(),
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
        url: Joi.string().required(),
        publicId: Joi.string().required(),
      }).required(),
  category: Joi.string().required(),
  store: Joi.string().required(),
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
