/**
 * App routes definitions.
 */
import { Router } from "express";

const router = Router();

// To confirm setup only.
router.use("/api/auth", function (req, res) {
  return res.send("Hello world!");
});

export default router;
