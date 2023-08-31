"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaildatePassword = exports.validateEmail = exports.validateUsername = void 0;
const validateUsername = (username) => {
    const fmtUsername = username.trim();
    return fmtUsername.length >= 3 && fmtUsername.length <= 60;
};
exports.validateUsername = validateUsername;
const validateEmail = (email) => {
    const fmtEmail = email.trim().toLowerCase();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return emailRegex.test(fmtEmail);
};
exports.validateEmail = validateEmail;
const vaildatePassword = (password) => password.length >= 6 && password.length <= 50;
exports.vaildatePassword = vaildatePassword;
