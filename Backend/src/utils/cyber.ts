import UserModel from "../models/user-model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";
import { AuthenticationError } from "../models/client-errors";

const secretKey = "vacation-handler";

function createNewToken(user: UserModel): string {
  // Remove password
  delete user.password;

  // Create container for the user object:
  const container = { user };

  // Create options:
  const options = { expiresIn: "3h" };

  // Create the the token:
  const token = jwt.sign(container, secretKey, options);

  return token;
}

function verifyToken(request: Request): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      // Extract authorization header:
      const header = request.header("authorization");
      // If missing:
      if (!header) {
        reject(new AuthenticationError("Invalid token"));
        return;
      }

      // Extract token:
      const token = header.substring(7);

      // If missing:
      if (!token) {
        reject(new AuthenticationError("Invalid token"));
        return;
      }

      // Verify:
      jwt.verify(token, secretKey, (err: JsonWebTokenError) => {
        console.log(err);
        if (err) {
          reject(new AuthenticationError("Invalid token"));
          return;
        }
        resolve(true);
      });
    } catch (err: any) {
      reject(err);
    }
  });
}

export default {
  createNewToken,
  verifyToken,
};
