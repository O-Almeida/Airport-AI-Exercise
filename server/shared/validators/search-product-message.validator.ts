import { Joi } from "celebrate";

export const ProductSearchByMessageJoi = Joi.object({
  search: Joi.string().required().min(3).messages({
    "string.base": '"search" must be type of "text"',
    "string.empty": '"search" can\'t be an empty field',
    "string.min": '"search" should have a minimum length of {#limit}',
    "any.required": '"search" is a required',
  }),
  lostAt: Joi.date().less("now").min("1-1-2020").messages({
    "date.base": '"lostAt" must be type of "date"',
    "date.empty": '"lostAt" can\'t be an empty field',
    "date.less": '"lostAt" must be before the current date time',
    "date.min": '"lostAt" minimum date time allowed is {#limit}',
  }),
});
