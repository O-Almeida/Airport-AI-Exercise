import { NextFunction, Request, Response } from "express";
import { AuthCredentialsDto } from "../dto/user/auth-credential.dto";
import { CreateUserDto } from "../dto/user/create-user.dto";
import { AuthService } from "../services/auth.service";

/**
 * Controller for handling authentication and user management requests.
 */
export class AuthController {
  private authService: AuthService;
  /**
   * Creates a new instance of the AuthController class.
   */
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Handles a POST request to create a new user.
   * @param req - The incoming request object.
   * @param res - The outgoing response object.
   * @param next - The next function in the middleware chain.
   * @throws Any error that occurs during user creation.
   */
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserDto: CreateUserDto = req.body;
      const user = await this.authService.signUp(createUserDto);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Authenticates a user with the provided credentials and returns an access token if successful.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @param next - The next middleware function.
   */
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const authCredentialsDto: AuthCredentialsDto = req.body;
      const accessToken = await this.authService.signIn(authCredentialsDto);

      res
        .status(200)
        .json({ accessToken, message: "Authenticated with success." });
    } catch (error) {
      next(error);
    }
  }
}
