import { UserRoles } from "./user-roles.enum";

/**
 * Interface representing a user.
 *
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @property {UserRoles} role - The role of the user.
 */
export interface IUser {
  username: string;
  password: string;
  role: UserRoles;
}
