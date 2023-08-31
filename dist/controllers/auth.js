"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const { UserModel } = require("../model/User");
const vaildate_1 = require("../utils/vaildate");
const tokenHander_1 = require("../utils/tokenHander");
exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        var user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).send("User Already exists");
        }
        const isUsernameVaild = (0, vaildate_1.validateUsername)(username);
        if (!isUsernameVaild)
            return res.status(400).send("username must be Between 3-60 Char");
        const isEmail = (0, vaildate_1.validateEmail)(email);
        if (!isEmail)
            return res.status(400).send("Email is Inalid.");
        const ispassword = (0, vaildate_1.vaildatePassword)(password);
        if (!ispassword)
            return res.status(400).send("password must be between 6-50 char.");
        const salt = await bcrypt.genSalt(10);
        const passwordHasd = await bcrypt.hash(password, salt);
        user = new UserModel({
            username,
            email,
            password: passwordHasd,
        });
        await user.save();
        const token = (0, tokenHander_1.createToken)(user.id, user.username, user.tokenVersion);
        const sendData = {
            user,
            token,
        };
        res.send(sendData);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        var user = await UserModel.findOneAndUpdate({ username }, { new: true });
        if (!user) {
            return res.status(400).json({ error: "User Not found" });
        }
        if (!user.status) {
            return res.status(400).json({ error: "status enable" });
        }
        const isPasswordVaild = await bcrypt.compare(password, user.password);
        if (!isPasswordVaild)
            return res.status(400).send("password is invalid");
        const token = (0, tokenHander_1.createToken)(user.id, user.username, user.tokenVersion);
        const sendData = {
            user,
            token,
        };
        res.send(sendData);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.logout = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user)
            return null;
        const newTokenVersion = user.tokenVersion + 1;
        const newuser = await UserModel.findOneAndUpdate({ username }, {
            tokenVersion: newTokenVersion,
        });
        res.send("logout Success ,Buy buy");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.currentUser = async (req, res) => {
    var _a;
    try {
        const user = await UserModel.findOne({ username: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username })
            .select("-password")
            .exec();
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.listUser = async (req, res) => {
    try {
        const user = await UserModel.find()
            .select("-password")
            .exec();
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.editUser = async (req, res) => {
    try {
        const { _id, status } = req.body;
        console.log(_id, status);
        const user = await UserModel.findOneAndUpdate({ _id }, { status }).exec();
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findOneAndDelete({ _id: id });
        res.send("Remove user Ok" + id);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
