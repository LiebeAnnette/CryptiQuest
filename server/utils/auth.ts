import jwt from "jsonwebtoken";
import { Request } from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";

dotenv.config();

const secret = process.env.JWT_SECRET || "supersecret";
const expiration = "2h";

export interface AuthUser {
  _id: string | ObjectId | undefined;
  username: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export function signToken({ _id, username, email }: AuthUser): string {
  const payload = { _id, username, email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function authMiddleware({ req }: { req: AuthRequest }): {
  req: AuthRequest;
} {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop()?.trim();
  }

  if (!token) {
    return { req };
  }

  try {
    const { data } = jwt.verify(token, secret) as { data: AuthUser };
    req.user = data;
  } catch {
    console.log("Invalid token");
  }

  return { req };
}
