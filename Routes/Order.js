const express = require("express");
const { placeOrder, getOrder, getAllOrders, deleteOrder } = require("../controllers/Order");
const { adminauthenticate, authenticate } = require("../middlewares/Middlewares");

const Router = express.Router();

Router.post("/placeOrder", authenticate, placeOrder); // Place an order
Router.get("/getoneOrder/:orderId", adminauthenticate, authenticate, getOrder); // Get single order
Router.get("/getAllOrders", adminauthenticate, getAllOrders); // Get all orders (Admin only)
Router.delete("/deleteOrder/:orderId", adminauthenticate, deleteOrder); // Delete an order

module.exports = Router;
