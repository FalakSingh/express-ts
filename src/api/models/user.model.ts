import { Model, model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { baseUrl, jwtExpires, jwtSecret } from "../../config/envVars";
import jwt from "jsonwebtoken";

export interface IUser extends Document, IUserMethods {
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  countryCode: string;
  phoneNumber: string;
  image: string;
  isDeleted: boolean;
  isDeactivated: boolean;
}

// Put all user instance methods in this interface:
interface IUserMethods {
  checkPass(password: string): Promise<boolean>;
  getJwt(): string;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
  emailExists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    fullName: String,
    email: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    password: { type: String, select: false },
    countryCode: String,
    phoneNumber: String,
    image: String,
    isDeleted: { type: Boolean, default: false },
    isDeactivated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// checks if the password is modified if it is then it is hashed before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.virtual("profileImageUrl").get(function () {
  return this.image ? baseUrl + this.image : null;
});

userSchema.statics = {
  emailExists: async function (email: string): Promise<boolean> {
    return Boolean(await this.findOne({ email, isDeleted: false }));
  },

  findByEmail: async function (email: string): Promise<IUser | null> {
    return await this.findOne({ email, isDeleted: false }).select("+password");
  },
};

userSchema.methods = {
  checkPass: async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  },

  getJwt: function (): string {
    const token = jwt.sign({ id: this._id }, jwtSecret, {
      expiresIn: jwtExpires,
    });
    return token;
  },
};

const User = model<IUser, IUserModel>("User", userSchema, "users");

export default User;
