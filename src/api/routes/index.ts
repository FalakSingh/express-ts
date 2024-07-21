import { Router } from "express";
const indexRouter = Router();
import userRouter from "./user";
import { env } from "../../config/envVars";
import { ErrorRes } from "../helpers/apiResponse";
import { httpStatus, messages } from "../constants/api.constants";
import authRouter from "./auth";

const routes = [
  { path: "auth", router: authRouter },
  { path: "user", router: userRouter },
];

routes.forEach(({ path, router }) => indexRouter.use(`/api/${path}`, router));

indexRouter.route("/").get((req, res) => {
  const uptime = process.uptime();
  res.send(`Server is up and running in ${env} environment <br/>
    Server Time: ${new Date()} <br />
    UpTime in seconds:${Math.floor(uptime)} <br />
    UpTime in minutes:${Math.floor(uptime / 60)} <br />
    UpTime in hours:${Math.floor(uptime / 3600)} <br />
    `);
});

indexRouter.use(async (req, res, next) => {
  next(new ErrorRes(httpStatus.notFound, messages.notFound));
});

export default indexRouter;
