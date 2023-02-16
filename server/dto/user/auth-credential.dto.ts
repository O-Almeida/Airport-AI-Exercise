/**
 * A Data Transfer Object representing the data needed to login in as a user.
 *
 * @class
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 *
 */
export class AuthCredentialsDto {
  username: string;
  password: string;
}
