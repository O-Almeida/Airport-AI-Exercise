import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../models/error/custom-error.model";
import jwt from "jsonwebtoken";
import { AUTH_SECRET } from "../../constants/auth.constants";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    throw new CustomError("Authentication necessary to do this operation", 403);
  }

  jwt.verify(token, AUTH_SECRET, (err) => {
    if (err) {
      throw new CustomError("Unauthorized access", 401);
    }
    next();
  });
}
