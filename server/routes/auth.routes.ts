import { celebrate, errors } from "celebrate";
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthJoi } from "../shared/validators/auth.validator";

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
    this.router.use(errors());
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
    this.router.post(
      "/register",
      celebrate({ body: AuthJoi }),
      this.authController.signUp
    );
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
    this.router.post(
      "/login",
      celebrate({ body: AuthJoi }),
      this.authController.signIn
    );
  }
}
