import { CreateUserDto } from "../dto/user/create-user.dto";
import { IUser } from "../models/user/user.interface";
import UserRepository from "../models/user/user.model";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthCredentialsDto } from "../dto/user/auth-credential.dto";
import { AUTH_EXPIRE, AUTH_SECRET } from "../constants/auth.constants";
import { CustomError } from "../models/error/custom-error.model";

/**
 * Service that provides authenticatioin and user management functionality.
 */
export class AuthService {
  /**
   * Authenticates a user with the provided credentials and returns an access token if successful.
   * @param authCredentialsDto - The credentials to use for authentication.
   * @returns A Promise that resolves to an access token if authentication is successful.
   * @throws An error with message "Please check your login credentials." if authentication fails.
   */
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          id: user.username,
        },
        AUTH_SECRET,
        {
          expiresIn: AUTH_EXPIRE,
        }
      );

      return accessToken;
    } else {
      throw new CustomError("Please check your login credentials.", 401);
    }
  }

  /**
   * Creates a new user entity in the database with the provided data.
   * @param createUserDto - The data necessary to create a new user entity.
   * @returns A Promise that resolves to the newly created user entity.
   * @throws An error with message "Username already in use." if the provided username is already taken.
   */
  async signUp(createUserDto: CreateUserDto): Promise<IUser> {
    const { username, password, role } = createUserDto;

    if (await this.findByUsername(username)) {
      throw new CustomError("Username already in use.", 400, { username });
    }
    // Generates a hashed password usign salt method
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const newUser = new UserRepository({
      username,
      password: hashedPassword,
      role,
    });

    return newUser.save();
  }

  /**
   * Finds a user entity in the database by their username.
   * @param username - The username of the user to find.
   * @returns A Promise that resolves to the retrieved user entity, or null if no user was found.
   */
  async findByUsername(username: string): Promise<IUser | null> {
    return UserRepository.findOne({ username }).exec();
  }
}
