"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Oder_1 = require("../model/Oder");
const Product_1 = require("../model/Product");
exports.oder = async (req, res) => {
    try {
        const { orders, totalCart } = req.body;
        const dataForm = [];
        console.log(orders);
        for (let i = 0; i < orders.length; i++) {
            const data = {
                pId: orders[i]._id,
                name: orders[i].name,
                category: orders[i].category,
                price: orders[i].price,
                count: orders[i].count,
            };
            dataForm.push(data);
            const updatePro = await Product_1.ProductModel.findOneAndUpdate({
                _id: orders[i]._id,
            }, {
                stock: orders[i].stock - orders[i].count,
                sold: orders[i].sold + orders[i].count,
            });
        }
        const newOrder = new Oder_1.OderModel({
            listOders: dataForm,
            total: totalCart,
        });
        await newOrder.save();
        res.send("Create oder Ok");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("server Error!!");
    }
};
