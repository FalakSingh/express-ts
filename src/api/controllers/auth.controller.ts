import { AuthService, UserService } from "../services";
import { successRes } from "../helpers/apiResponse";
import { httpStatus, messages } from "../constants/api.constants";
import { ExpressHandler } from "../types/express";

const register: ExpressHandler = async (req, res) => {
  const user = await UserService.create(req.body);
  return successRes(res, httpStatus.ok, messages.userRegister, user);
};

const login: ExpressHandler = async (req, res) => {
  const user = await AuthService.login(req.body);
  return successRes(res, httpStatus.ok, messages.loggedIn, user);
};

const createSuperAdmin: ExpressHandler = async (req, res) => {
  await AuthService.createSuperAdmin();
  return successRes(res, httpStatus.ok, messages.adminCreated);
};

const adminLogin: ExpressHandler = async (req, res) => {
  const admin = await AuthService.adminLogin(req.body);
  return successRes(res, httpStatus.ok, messages.loggedIn, admin);
};

export { register, createSuperAdmin, login, adminLogin };
