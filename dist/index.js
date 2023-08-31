"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgen = require("morgan");
const cors = require("cors");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect DB Success");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
app.use(morgen("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use(cookie());
connectDB();
readdirSync(__dirname + "/routers").map((r) => app.use("/api", require(__dirname + "/routers/" + r)));
app.listen(port, () => console.log("server is run" + port));
