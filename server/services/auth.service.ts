import { CreateUserDto } from "../dto/user/create-user.dto";
import { IUser } from "../models/user/user.interface";
import UserRepository from "../models/user/user.model";
import * as bcrypt from "bcryptjs";
import { AuthCredentialsDto } from "../dto/user/auth-credential.dto";

export class AuthService {
  /**
   * Creates a new user entity in the database with the provided data.
   * @param createUserDto - The data necessary to create a new user entity.
   * @returns A Promise that resolves to the newly created user entity.
   * @throws An error with message "Username already in use." if the provided username is already taken.
   */
  async signUp(createUserDto: CreateUserDto): Promise<IUser> {
    const { username, password, role } = createUserDto;

    if (await this.findByUsername(username)) {
      throw new Error("Username already in use.");
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
