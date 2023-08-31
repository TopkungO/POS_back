import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

export class category {
  _id: mongoose.Types.ObjectId;

  @prop({ required: true })
  category: string;

}

export const CategoryModel = getModelForClass(category, {
  schemaOptions: { timestamps: true },
});
