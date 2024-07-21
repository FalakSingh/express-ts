import { UserService } from "../services";
import { successRes } from "../helpers/apiResponse";
import { httpStatus } from "../constants/api.constants";
import { ExpressHandler } from "../types/express";

const getUserDetails: ExpressHandler = async (req, res) => {
  const userDetails = await UserService.fetchDetails(req.params.id);
  return successRes(
    res,
    httpStatus.ok,
    "User details fetched successfully",
    userDetails
  );
};

export { getUserDetails };
