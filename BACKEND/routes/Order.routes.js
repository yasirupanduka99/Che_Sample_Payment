const express = require("express");
const OrderRouter = express.Router();

const {
  addOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getLastDocument,
  
} = require("../controller/Order.controller");

OrderRouter.post("/Ordercreate", addOrder);
OrderRouter.get("/allOrders", getAllOrders);
OrderRouter.get("/oneOrder/:id" , getOneOrder);
OrderRouter.patch("/Update/:id", updateOrder);
OrderRouter.delete("/delete/:id", deleteOrder);
OrderRouter.get('/last', getLastDocument);


module.exports = OrderRouter;
