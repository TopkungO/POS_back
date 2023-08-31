import mongoose from "mongoose";
import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { category } from "./Category";

export class product {
  _id: mongoose.Types.ObjectId;

  @prop({ required: true, unique: true })
  public productId: number;

  @prop({ required: true })
  name: string;

  @prop({ default: "-" })
  description: string;

  @prop({ ref: () => category, type: () => String })
  public category?: Ref<category, string>;

  @prop({ default: 0 })
  costPrice: number; //ต้นทุน

  @prop({ default: 0 })
  price: number; //ราคาขาย

  @prop({ default: 0 })
  stock: number; //จำนวนที่มีอยู่

  @prop({ default: 0 })
  sold: number; //จำนวนที่ขายได้

  @prop()
  file: string;

}

export const ProductModel = getModelForClass(product, {
  schemaOptions: { timestamps: true },
});
