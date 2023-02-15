import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

/**
 * Class representing authentication routes.
 */
export class AuthRoutes {
  /**
   * Express router for authentication routes.
   * @public
   */
  public router: Router;
  /**
   * Controller for authentication routes.
   * @private
   */
  private authController: AuthController;

  /**
   * Creates a new instance of the AuthRoutes class.
   * @constructor
   */
  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  /**
   * Initializes authentication routes.
   * @private
   */
  private initializeRoutes() {
    /**
     * Route for registering a new user.
     * @name /register
     * @function
     * @memberof AuthRoutes
     * @inner
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {function} next - Express next middleware function.
     */
    this.router.post("/register", this.authController.signUp);
    /**
     * Route for user login.
     * @name /login
     * @function
     * @memberof AuthRoutes
     * @inner
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {function} next - Express next middleware function.
     */
    this.router.post("/login", this.authController.signIn);
  }
}
