import { ExpressHandler } from "../types/express";

const defaultMiddleware: ExpressHandler = async (req, res, next) => {
  next();
};

export default defaultMiddleware;
