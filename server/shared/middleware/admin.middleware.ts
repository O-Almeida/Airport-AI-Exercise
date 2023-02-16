import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../../models/error/custom-error.model";
import { UserRoles } from "../../models/user/user-roles.enum";
import UserRepository from "../../models/user/user.model";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const username = res.locals.jwtPayload.id;

    const user = await UserRepository.findOne({ username }).exec();

    if (user?.role !== UserRoles.AGENT) {
      throw new CustomError("You don't have rights to do this action.", 403);
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden" });
  }
}
