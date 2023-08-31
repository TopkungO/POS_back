import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) {
    console.log(file);
    
    callback(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage: storage }).single('file');
