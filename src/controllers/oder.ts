import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

import mongoose, { Document, Schema } from "mongoose";
import { OderModel } from "../model/Oder";
import { ProductModel } from "../model/Product";

exports.oder = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | any> => {
  try {
    const { orders, totalCart } = req.body;
    const dataForm = [];
    console.log(orders);
    
    for (let i = 0; i < orders.length; i++) {
      //จัดข้อมูล
      const data = {
        pId: orders[i]._id,
        name: orders[i].name,
        category: orders[i].category,
        price: orders[i].price,
        count: orders[i].count,
      };
      dataForm.push(data);

      //updateData

      const updatePro = await ProductModel.findOneAndUpdate(
        {
          _id: orders[i]._id,
        },
        {
          stock: orders[i].stock - orders[i].count,
          sold: orders[i].sold + orders[i].count,
        }
      );
    }
    const newOrder = new OderModel({
      listOders: dataForm,
      total: totalCart,
    });
    await newOrder.save();

    res.send("Create oder Ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error!!");
  }
};
