import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Interface for token signing and basic user data
interface IUser {
  username: string;
  email: string;
  password?: string;
  savedCryptids: Schema.Types.ObjectId[];
  savedLocations: Schema.Types.ObjectId[];
}

// Interface for the actual Mongoose document (includes methods)
interface IUserDocument extends IUser, Document {
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  savedCryptids: [{ type: Schema.Types.ObjectId, ref: "Cryptid" }],
  savedLocations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
});

// Hash the password before saving

userSchema.pre<IUserDocument>('save', function (next) {
  const user = this as IUserDocument;

  if (user.isNew || user.isModified('password')) {
    bcrypt.hash(user.password!, 10).then((hashed) => {
      user.password = hashed;
      next();
    }).catch((err) => {
      console.error(err);
      next(err);
    });
  } else {
    next();
  }
});

// Compare passwords
userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Export the model
const User: Model<IUserDocument> = model<IUserDocument>("User", userSchema);
export default User;

// Export types
export type { IUser, IUserDocument };
