/**
 * App routes definitions.
 */
import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { ProductRoutes } from "./product.routes";

const router = Router();

router.use("/auth", new AuthRoutes().router);

router.use("/product", new ProductRoutes().router);

export default router;
