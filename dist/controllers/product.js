"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../model/Category");
const Product_1 = require("../model/Product");
const mongoose_1 = __importStar(require("mongoose"));
const countSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    seq: {
        type: Number,
    },
});
const counterModel = mongoose_1.default.model("counter", countSchema);
exports.category = async (req, res) => {
    try {
        const { category } = req.body;
        var newCategory = await Category_1.CategoryModel.findOne({ category }).exec();
        if (newCategory)
            return res.status(400).send("Category in database");
        newCategory = new Category_1.CategoryModel({
            category,
        });
        await newCategory.save();
        res.send("Add Category Ok");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.listcategory = async (req, res) => {
    try {
        const category = await Category_1.CategoryModel.find().exec();
        res.send(category);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.editcategory = async (req, res) => {
    try {
        const { _id, category } = req.body;
        const checkCate = await Category_1.CategoryModel.findOne({ category }).exec();
        if (checkCate)
            return res.status(400).send("Category redundant");
        const cate = await Category_1.CategoryModel.findOneAndUpdate({ _id }, { category }).exec();
        res.send("update Category Ok" + cate);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.deletecategory = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const deleteCate = await Category_1.CategoryModel.findOneAndRemove({ _id: id }).exec();
        res.send("delete Category Ok" + id);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.createProduct = async (req, res) => {
    var _a;
    try {
        req.body.file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const { name, category, costPrice, price, stock, description, file } = req.body;
        const count = await counterModel.findOneAndUpdate({
            id: "autoVal",
        }, { $inc: { seq: 1 } }, { new: true });
        if (!count) {
            const count = new counterModel({ id: "autoVal", seq: 1 });
            await count.save();
        }
        else {
            const newProduct = new Product_1.ProductModel({
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
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.listProduct = async (req, res) => {
    try {
        const product = await Product_1.ProductModel.find().populate("category").exec();
        res.send(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.readProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product_1.ProductModel.findOne({ _id: id })
            .populate("category")
            .exec();
        res.send(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.removeProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product_1.ProductModel.findOneAndDelete({ _id: id });
        res.send("product success");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.editProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, category, costPrice, price, stock, description, file } = req.body;
        const product = await Product_1.ProductModel.findOneAndUpdate({ _id: id }, { name, category, costPrice, price, stock, description, file });
        res.send("product success");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
