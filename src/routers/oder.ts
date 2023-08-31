import express from "express";

const router = express.Router();

const { auth, adminCheck } = require("../middleware/auth");

const { oder } = require("../controllers/oder");

//@Endpoint localhost:5000/api/oder
router.post("/oder", oder);


module.exports = router;
