import { IsString, Matches, MaxLength, MinLength } from "class-validator";

/**
 * A Data Transfer Object representing the data needed to login in as a user.
 *
 * @class
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 *
 */
export class AuthCredentialsDto {
  @IsString()
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  /* Password need to contains at leats one digit or non-word character,
  at least one uppercase letter, at least one lowercase letter,
  and not contain any periods or newlines.
  */
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password is too weak.",
  })
  password: string;
}
