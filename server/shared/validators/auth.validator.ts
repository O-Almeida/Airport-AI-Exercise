import { Joi } from "celebrate";

export const AuthJoi = Joi.object({
  username: Joi.string().required().min(3).max(20).messages({
    "string.empty": '"username" must be type of text',
    "any.required": '"username" is required',
    "string.min": "Username should have a minimum length of {#limit}",
    "string.max": "Username should have a maximum length of {#limit}",
  }),
  password: Joi.string()
    .required()
    .min(5)
    .max(30)
    .pattern(
      new RegExp("((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")
    )
    .messages({
      "any.required": '"password" is required',
      "string.min": "Username should have a minimum length of {#limit}",
      "string.max": "Username should have a maximum length of {#limit}",
      "string.pattern.base":
        "Password need to contains at leats one digit or non-word character, at least one uppercase letter, at least one lowercase letter, and not contain any periods or newline.",
    }),
});
