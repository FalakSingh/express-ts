import { httpStatus, messages } from "../constants/api.constants";
import { ErrorRes } from "../helpers/apiResponse";
import User, { IUser } from "../models/user.model";

const create = async (data: Partial<IUser>) => {
  data.email = data?.email?.toLowerCase();
  if (await User.emailExists(data.email))
    throw new ErrorRes(httpStatus.badRequest, messages.emailExists);

  const user = (await User.create(data)).toObject();
  delete user.password;

  return user;
};

const fetchDetails = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export { create, fetchDetails };
