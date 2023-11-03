const joi = require("joi");

const ticketRegistrationSchema = joi.object({
  title: joi.string().required(),
  ticketPrice: joi.number().required(),
  fromLocation: joi.string().required(),
  toLocation: joi.string().required(),
  toLocationPhotoUrl: joi.string().required(),
});
module.exports = { ticketRegistrationSchema };
