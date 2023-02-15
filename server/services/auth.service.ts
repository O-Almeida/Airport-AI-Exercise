import { CreateUserDto } from "../dto/user/create-user.dto";
import { IUser } from "../models/user/user.interface";
import UserRepository from "../models/user/user.model";

export class AuthService {
  /**
   * Finds a user entity in the database by their username.
   * @param username - The username of the user to find.
   * @returns A Promise that resolves to the retrieved user entity, or null if no user was found.
   */
  async findByUsername(username: string): Promise<IUser | null> {
    return UserRepository.findOne({ username }).exec();
  }
}
