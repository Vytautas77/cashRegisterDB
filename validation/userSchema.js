const joi = require("joi");

const userRegistrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  moneyBalance: joi.string().required(),
});
module.exports = { userRegistrationSchema };
