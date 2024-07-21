const port: string = process.env.PORT!;
const mongoUri: string = process.env.MONGODB_URI!;
const env: string = process.env.NODE_ENV!;
const baseUrl: string = process.env.BASE_URL!;
const jwtSecret: string = process.env.JWT_SECRET!;
const jwtExpires: string = process.env.JWT_EXPIRES!;
const adminEmail: string = process.env.ADMIN_EMAIL!;
const adminPassword: string = process.env.ADMIN_PASSWORD!;

export {
  port,
  mongoUri,
  env,
  baseUrl,
  jwtSecret,
  adminEmail,
  adminPassword,
  jwtExpires,
};
