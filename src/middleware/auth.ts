const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User");

import { Response, Request, NextFunction } from "express";
import { User } from "../model/User";

export interface AuthenticatedRequest extends Request{
  user?:User
}

exports.auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): any => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).json("no token , authorization denied");
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET!);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).send("Token Invavid!!");
  }
};

exports.adminCheck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.user!;

    const adminUser = await UserModel.findOne({ username }).exec();

    if (!adminUser.role.includes("ADMIN")) {
      res.status(403).send("Admin Access denied");
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send("Admin Access denied");
  }
};
