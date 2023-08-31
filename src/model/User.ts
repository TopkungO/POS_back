import { getModelForClass, prop } from "@typegoose/typegoose";
import { RoleOption } from "../types";
import mongoose from "mongoose";

export class User {
  _id: mongoose.Types.ObjectId;

  @prop({ required: true, trim: true, unique: true, lowercase: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, trim: true })
  email: string;

  @prop({ default: 0 })
  tokenVersion: number;

  @prop()
  resetPasswordToken?: string;

  @prop()
  resetPasswordTokenExpiry?: number;

  @prop({
    type: String,
    enum: RoleOption,
    default: [RoleOption.client],
  })
  role: RoleOption[];

  @prop({ type: Boolean, default: false })
  status: boolean;

}

export const UserModel = getModelForClass(User,{schemaOptions:{timestamps:true}});
