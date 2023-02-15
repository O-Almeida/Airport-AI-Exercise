import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserRoles } from "../../models/user/user-roles.enum";

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

  @IsEnum(UserRoles, { message: "Invalid role" })
  @IsOptional()
  role?: string;
}
