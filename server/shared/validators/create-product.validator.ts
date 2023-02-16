import { Joi } from "celebrate";

export const CreateProductJoi = Joi.object({
  type: Joi.string().required().empty().max(50).messages({
    "string.base": '"type" must be type of "text"',
    "string.empty": '"type" cannot be an empty field',
    "string.max": '"type" should have a maximum length of {#limit}',
    "any.required": '"type" is a required field',
  }),
  brand: Joi.string().required().empty().max(50).messages({
    "string.base": '"brand" must be type of "text"',
    "string.empty": '"brand" can\'t be an empty field',
    "string.max": '"brand" should have a maximum length of {#limit}',
    "any.required": '"brand" is a required',
  }),
  model: Joi.string().empty().max(50).messages({
    "string.base": '"model" must be type of "text"',
    "string.empty": '"model" can\'t be an empty field',
    "string.max": '"model" should have a maximum length of {#limit}',
  }),
  location: Joi.string().empty().max(50).messages({
    "string.base": '"location" must be type of "text"',
    "string.empty": '"location" can\'t be an empty field',
    "string.max": '"location" should have a maximum length of {#limit}',
  }),
  lostAt: Joi.date().required().empty().less("now").min("1-1-2020").messages({
    "date.base": '"lostAt" must be type of "date"',
    "date.empty": '"lostAt" can\'t be an empty field',
    "date.less": '"lostAt" must be before the current date time',
    "date.min": '"lostAt" minimum date time allowed is {#limit}',
    "any.required": '"lostAt" is required',
  }),
});
