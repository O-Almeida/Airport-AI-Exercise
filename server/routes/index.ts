/**
 * App routes definitions.
 */
import { Router } from "express";
import { AuthRoutes } from "./auth.routes";

const router = Router();

router.use("/auth", new AuthRoutes().router);

export default router;
