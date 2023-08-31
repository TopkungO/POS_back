import mongoose from "mongoose";
import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { product } from "./Product";


export class Oder {
  _id: mongoose.Types.ObjectId;

  @prop()
  listOders:[];

  @prop({ default: 0 })
  total: number; //จำนวนที่ขายได้
}

export const OderModel = getModelForClass(Oder, {
  schemaOptions: { timestamps: true },
});
