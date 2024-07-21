import { NextFunction, Request, Response } from "express";
import logger from "../../config/logger";
import { env } from "../../config/envVars";
import { ErrorRes } from "../helpers/apiResponse";
import { httpStatus, messages } from "../constants/api.constants";

export default async function ErrorHandler(
  err: any,
  req: Request,
  res: Response
) {
  if (!(err instanceof ErrorRes)) {
    err = new ErrorRes(httpStatus.serverError, messages.serverError);
  }
  if (env !== "local") {
    logger.error({ status: err.status, message: err.message });
  }
  return res
    .status(err.status)
    .json({ status: err.status, message: err.message, data: {} });
}
