import { ReadSyncOptions } from "fs";

const express = require("express");
const morgen = require("morgan");
const cors = require("cors");
const cookie =require("cookie-parser")
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

// -----------------------
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
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//middleware
app.use(morgen("dev"));
app.use(bodyParser.json({limit:"2mb"}));

app.use(cors());
app.use(cookie());
connectDB();

//routes
readdirSync(__dirname + "/routers").map((r: ReadSyncOptions) =>
  app.use("/api", require(__dirname + "/routers/" + r))
);

app.listen(port, () => console.log("server is run" + port));
