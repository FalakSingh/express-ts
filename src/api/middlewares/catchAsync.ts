import { ExpressHandler } from "../types/express";

const catchAsync =
  (handler: ExpressHandler): ExpressHandler =>
  async (req, res, next) =>
    handler(req, res, next).catch(next);

export default catchAsync;
