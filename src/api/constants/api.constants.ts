const httpStatus: Record<string, number> = {
  serverError: 500,
  badRequest: 400,
  notFound: 404,
  unauthorized: 401,
  forbidden: 403,
  ok: 200,
};

const messages: Record<string, string> = {
  serverError: "Internal Server Error",
  badRequest: "Bad request",
  notFound: "Not found",
  unauthorized: "Unauthorized",
  forbidden: "Forbidden",
  fetched: "Data fetched successfully",
  emailExists: "Email already exists",
  invalidCredentials: "Invalid Credentials",
  otpNotCerified: "Please Verifiy your account first",
  isDeactivated: "Your account has been deactivated by Admin",
  userRegister: "User Registered Successfully",
  loggedIn: "Logged in successfully",
  invalidEmail: "Invalid Email",
  adminCreated: "Admin created successfully",
  adminExists: "Admin already exists",
  adminDoesntExists: "Admin doesn't exist",
};

export { httpStatus, messages };
