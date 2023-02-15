import { CreateUserDto } from "../../dto/user/create-user.dto";
import { IUser } from "../../models/user/user.interface";

/**
 * A interface for a respository user entities.
 */
export interface IUserRepository {
  /**
   * Creates a new user entity using the provided DTO.
   * @param createUserDto - The data necessary to create a new user entity.
   * @returns A Promise that resolves to the newly created user entity.
   */
  createUser(createUserDto: CreateUserDto): Promise<IUser>;
  /**
   * Retrieves the user entity associated with the provided username.
   * @param username - The username associated with the user to retrieve.
   * @returns A Promise that resolves to the retrieved user entity, or null if no user was found.
   */
  findByUsername(username: string): Promise<IUser | null>;
}
