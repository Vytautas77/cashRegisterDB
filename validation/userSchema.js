const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  boughtTickets: joi.array().required(),
  moneyBalance: joi.number().required(),
});

const userLoginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
module.exports = { userSchema, userLoginSchema };
