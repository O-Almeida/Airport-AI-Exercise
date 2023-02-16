import { Joi } from "celebrate";

export const DeleteProductJoi = Joi.object({
  id: Joi.string().required().empty().length(24).messages({
    "string.base": '"id" must be type of "text"',
    "any.required": '"id" is a required',
    "string.empty": '"id" can\'t be an empty field',
  }),
});
