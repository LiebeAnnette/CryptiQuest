import { User, IUser, IUserDocument } from "../models";
import { signToken, AuthUser } from "../utils/auth";
import { AuthenticationError } from "apollo-server-express";
import { Types } from "mongoose";
import { Request } from "express";

const resolvers = {
  Query: {
    me: async (
      _parent: unknown,
      _args: unknown,
      context: { req: { user?: AuthUser } }
    ) => {
      const user = context.req?.user;
      if (user) {
        return User.findById(user._id).populate([
          "savedCryptids",
          "savedLocations",
        ]);
      }
      throw new AuthenticationError("Not logged in");
    },

    users: async () => {
      return User.find({}).populate(["savedCryptids", "savedLocations"]);
    },
  },

  Mutation: {
    addUser: async (_parent: unknown, args: any) => {
      const userDoc = (await User.create(args)) as IUserDocument & {
        _id: Types.ObjectId;
      };
      const user = {
        _id: userDoc._id.toString(),
        username: userDoc.username,
        email: userDoc.email,
      };
      const token = signToken(user);
      return { token, user: userDoc };
    },

    login: async (
      _parent: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      const userDoc = (await User.findOne({ email })) as IUserDocument | null;
      if (!userDoc) {
        throw new AuthenticationError("Incorrect email");
      }

      const validPw = await userDoc.isCorrectPassword(password);
      if (!validPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const user = {
        _id: userDoc._id?.toString() || "", // fallback to empty string if it's undefined
        username: userDoc.username,
        email: userDoc.email,
        savedCryptids: userDoc.savedCryptids,
        savedLocations: userDoc.savedLocations,
      };

      const token = signToken(user);
      return { token, user: userDoc };
    },
  },
};

export default resolvers;
