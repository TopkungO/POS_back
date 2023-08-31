"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (userId, username, tokenVersion) => {
    const token = jsonwebtoken_1.default.sign({ userId, username, tokenVersion }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
exports.createToken = createToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
exports.verifyToken = verifyToken;
