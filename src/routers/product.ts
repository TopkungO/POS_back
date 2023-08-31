import express from "express";

const router = express.Router();

const { auth, adminCheck } = require("../middleware/auth");
const {upload} = require("../middleware/upload")

const {
  category,
  listcategory,
  editcategory,
  deletecategory,
  createProduct,
  listProduct,
  readProduct,
  removeProduct,
  editProduct,
} = require("../controllers/product");

//@Endpoint localhost:5000/api/category
router.post("/category" ,auth, adminCheck, category);
router.get("/category" , listcategory);
router.put("/category" ,auth, adminCheck, editcategory);
router.delete("/category/:id" ,auth, adminCheck, deletecategory);

//@Endpoint localhost:5000/api/product
router.get("/product", listProduct);
router.get("/product/:id", readProduct);
router.post("/product", auth,upload, createProduct);
router.delete("/product/:id", auth,adminCheck, removeProduct);
router.put("/product/:id", auth, adminCheck, upload, editProduct);



module.exports = router;
