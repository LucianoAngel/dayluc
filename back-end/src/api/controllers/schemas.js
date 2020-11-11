const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().required(),
  email: Joi.string().email(),
});

module.exports = {
  userSchema
};
