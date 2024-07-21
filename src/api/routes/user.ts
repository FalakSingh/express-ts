import { Router } from "express";
import { UserController } from "../controllers";

const userRouter: Router = Router();

const userRoutes = [
  {
    path: "/:id",
    method: "get",
    handler: [UserController.getUserDetails],
  },
];

userRoutes.forEach(({ path, method, handler }) =>
  (userRouter as any)[method](path, handler)
);

export default userRouter;
