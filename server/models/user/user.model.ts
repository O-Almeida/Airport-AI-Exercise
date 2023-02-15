import { model, Schema } from "mongoose";
import { UserRoles } from "./user-roles.enum";
import { IUser } from "./user.interface";

/**
 * Model that represents a user.
 *
 * @property {string} username - The username of the user. Required
 * @property {string} password - The password of the user. Required
 * @property {UserType} role - The role of the user. Can be either "agent" or "passenger". Default value is "passenger".
 *
 */
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please, provide a username."],
  },
  password: {
    type: String,
    required: [true, "Please, provide a password"],
  },
  role: {
    type: String,
    enum: UserRoles,
    default: "passenger",
  },
});

/**
 * Returns the Mongoose model fot the User.
 *
 * @returns {UserModel} The Mongoose model for the User.
 */
export default model<IUser>("User", UserSchema);
