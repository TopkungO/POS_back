"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { auth, adminCheck } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { category, listcategory, editcategory, deletecategory, createProduct, listProduct, readProduct, removeProduct, editProduct, } = require("../controllers/product");
router.post("/category", auth, adminCheck, category);
router.get("/category", listcategory);
router.put("/category", auth, adminCheck, editcategory);
router.delete("/category/:id", auth, adminCheck, deletecategory);
router.get("/product", listProduct);
router.get("/product/:id", readProduct);
router.post("/product", auth, upload, createProduct);
router.delete("/product/:id", auth, adminCheck, removeProduct);
router.put("/product/:id", auth, adminCheck, upload, editProduct);
module.exports = router;