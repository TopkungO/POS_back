import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { CategoryModel } from "../model/Category";
import { ProductModel } from "../model/Product";
import mongoose, { Document, Schema } from "mongoose";
import { File } from "buffer";

interface IProduct extends Document {
  id: String;
  seq: number;
}

const countSchema = new Schema<IProduct>({
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
});

const counterModel = mongoose.model("counter", countSchema);

// ?---------------------------------------category-----------------------------

exports.category = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const { category } = req.body;

    var newCategory = await CategoryModel.findOne({ category }).exec();

    if (newCategory) return res.status(400).send("Category in database");

    newCategory = new CategoryModel({
      category,
    });
    await newCategory.save();

    res.send("Add Category Ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.listcategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const category = await CategoryModel.find().exec();

    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.editcategory = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const { _id, category } = req.body;
    const checkCate = await CategoryModel.findOne({ category }).exec();

    if (checkCate) return res.status(400).send("Category redundant");

    const cate = await CategoryModel.findOneAndUpdate(
      { _id },
      { category }
    ).exec();

    res.send("update Category Ok" + cate);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
exports.deletecategory = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const id = req.params.id;
    console.log(id);

    const deleteCate = await CategoryModel.findOneAndRemove({ _id: id }).exec();

    res.send("delete Category Ok" + id);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
// ?---------------------------------------product-----------------------------
exports.createProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    req.body.file = req.file?.filename;
    const { name, category, costPrice, price, stock, description, file } =
      req.body;

    const count = await counterModel.findOneAndUpdate(
      {
        id: "autoVal",
      },
      { $inc: { seq: 1 } },
      { new: true }
    );

    if (!count) {
      const count = new counterModel({ id: "autoVal", seq: 1 });
      await count.save();
    } else {
      const newProduct = new ProductModel({
        productId: count.seq,
        name,
        category,
        costPrice,
        price,
        stock,
        description,
        file,
      });
      await newProduct.save();
    }

    res.send("Create product success");
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.listProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const product = await ProductModel.find().populate("category").exec();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
exports.readProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ _id: id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};

exports.removeProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOneAndDelete({ _id: id });
    res.send("product success");
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
exports.editProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const id = req.params.id;
    const { name, category, costPrice, price, stock, description, file } =
      req.body;

    const product = await ProductModel.findOneAndUpdate(
      { _id: id },
      { name, category, costPrice, price, stock, description, file }
    );
    res.send("product success");
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
