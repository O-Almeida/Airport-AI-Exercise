/**
 * A Data Transfer Object representing the data needed to creat a new user.
 *
 * @class
 * @property {string} username - The username of the new user.
 * @property {string} password - The password of the new user.
 * @property {UserRoles} role - The role of the new user, must be one of the UserRoles enum values.
 *
 */
export class CreateUserDto {
  username: string;
  password: string;
  role?: string;
}
