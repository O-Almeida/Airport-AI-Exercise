import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../models/error/custom-error.model";

export default function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      "Somethig went wrong! Please, try again later."
    );
  }
  res.status((customError as CustomError).status).send(customError);
}
