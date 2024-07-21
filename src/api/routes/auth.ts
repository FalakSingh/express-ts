import { Router } from "express";
import upload from "../helpers/upload";
import filehandler from "../helpers/filehandler";
import { AuthController } from "../controllers";
import { validateCreateUser, validateUserLogin } from "../validations/auth";
import catchAsync from "../middlewares/catchAsync";
import { ExpressHandler } from "../types/express";
import defaultMiddleware from "../middlewares/defaultMiddleware";

const authRouter = Router();

const authRoutes = [
  {
    path: "/register",
    method: "post",
    handler: AuthController.register,
    middleware: [upload, filehandler, validateCreateUser],
  },
  {
    path: "/login",
    method: "post",
    handler: AuthController.login,
    middleware: [validateUserLogin],
  },
  {
    path: "/create-super-admin",
    method: "get",
    handler: AuthController.createSuperAdmin,
  },
  {
    path: "/admin-login",
    method: "post",
    handler: AuthController.adminLogin,
    middleware: [validateUserLogin],
  },
];

authRoutes.forEach(
  ({ path, method, handler, middleware = [defaultMiddleware] }) =>
    (authRouter as any)[method](
      path,
      middleware,
      catchAsync(handler as ExpressHandler)
    )
);

export default authRouter;
