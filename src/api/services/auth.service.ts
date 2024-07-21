import { adminEmail, adminPassword } from "../../config/envVars";
import { httpStatus, messages } from "../constants/api.constants";
import { ErrorRes } from "../helpers/apiResponse";
import Admin, { IAdmin } from "../models/admin.model";
import User, { IUser } from "../models/user.model";

const login = async (data: { email: string; password: string }) => {
  const email = data.email.toLowerCase();
  const password = data.password;

  const user = await User.findByEmail(email);

  if (!user) throw new ErrorRes(httpStatus.badRequest, messages.invalidEmail);

  if (user.isDeactivated)
    throw new ErrorRes(httpStatus.badRequest, messages.isDeactivated);

  const passCheck = await user.checkPass(password);
  if (!passCheck)
    throw new ErrorRes(httpStatus.badRequest, messages.invalidCredentials);

  const token = user.getJwt();

  const userObj: IUser & { token: string } = user.toObject();
  delete userObj.password;
  userObj.token = token;

  return userObj;
};

const createSuperAdmin = async () => {
  if (await Admin.superAdminExists())
    throw new ErrorRes(httpStatus.badRequest, messages.adminExists);

  await Admin.create({
    email: adminEmail,
    password: adminPassword,
  });
};

const adminLogin = async (data: { email: string; password: string }) => {
  const email = data.email.toLowerCase();
  const password = data.password;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin)
    throw new ErrorRes(httpStatus.badRequest, messages.adminDoesntExists);

  const passcheck = await admin.checkPass(password);

  if (!passcheck)
    throw new ErrorRes(httpStatus.badRequest, messages.invalidCredentials);

  const token = admin.getJwt();

  const adminObj: IAdmin & { token: string } = admin.toObject();
  delete adminObj.password;

  adminObj.token = token;

  return adminObj;
};
export { login, createSuperAdmin, adminLogin };
