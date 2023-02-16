import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../models/error/custom-error.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AUTH_SECRET } from "../../constants/auth.constants";

export function authMiddlware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new CustomError("Authentication token missing");
    }

    const decoded = jwt.verify(token, AUTH_SECRET);

    res.locals.jwtPayload = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
