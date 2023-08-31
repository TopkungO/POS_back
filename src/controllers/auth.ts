import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const { UserModel } = require("../model/User");

import {
  vaildatePassword,
  validateEmail,
  validateUsername,
} from "../utils/vaildate";
import { createToken } from "../utils/tokenHander";
import { AuthenticatedRequest } from "../middleware/auth";

exports.register = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const { username, password, email } = req.body;

    //checkuser database
    var user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).send("User Already exists");
    }

    //valiDate username
    const isUsernameVaild = validateUsername(username);
    if (!isUsernameVaild)
      return res.status(400).send("username must be Between 3-60 Char");
    //validata email
    const isEmail = validateEmail(email);
    if (!isEmail) return res.status(400).send("Email is Inalid.");
    //validate password
    const ispassword = vaildatePassword(password);
    if (!ispassword)
      return res.status(400).send("password must be between 6-50 char.");

    const salt = await bcrypt.genSalt(10);
    const passwordHasd = await bcrypt.hash(password, salt);

    user = new UserModel({
      username,
      email,
      password: passwordHasd,
    });
    await user.save();

    //createtoken
    const token = createToken(user.id, user.username, user.tokenVersion);
    const sendData = {
      user,
      token,
    };

    res.send(sendData);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.login = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    //checkuser database
    var user = await UserModel.findOneAndUpdate({username }, { new: true });
    if (!user) {
      return res.status(400).json({ error: "User Not found" });
    }
    if (!user.status) {
      return res.status(400).json({ error: "status enable" });
    }

    //checkpassword
    const isPasswordVaild = await bcrypt.compare(password, user.password);
    
    if (!isPasswordVaild) return res.status(400).send("password is invalid");


    const token = createToken(user.id, user.username, user.tokenVersion);

    const sendData = {
      user,
      token,
    };

    res.send(sendData);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.logout = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const { username } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return null;

    const newTokenVersion = user.tokenVersion + 1;
    const newuser = await UserModel.findOneAndUpdate(
      { username },
      {
        tokenVersion: newTokenVersion,
      }
    );
    res.send("logout Success ,Buy buy");
    
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.currentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await UserModel.findOne({ username: req.user?.username })
      .select("-password")
      .exec();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.listUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await UserModel.find()
      .select("-password")
      .exec();
 
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
exports.editUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { _id , status } =req.body
    console.log(_id, status);
    const user = await UserModel.findOneAndUpdate({_id},{status}).exec()
    res.send(user);
    
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
exports.deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<Response | any> => {
  try {
    const id = req.params.id;
    // const user= await UserModel.findOne({_id:id})
    // if (user.role.includes("ADMIN") || user.role.includes("SUPERADMIN")) return res.status(400).send("Not remove user is Admin or superadmin");

    const user = await UserModel.findOneAndDelete({_id:id})

    res.send("Remove user Ok" + id);
    
       
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};



