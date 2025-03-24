const express = require("express");
const { placeOrder, getOrder, getAllOrders, deleteOrder } = require("../controllers/orderController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/placeOrder", authMiddleware, placeOrder); // Place an order
router.get("/getoneOrder/:orderId", authMiddleware, getOrder); // Get single order
router.get("/getAllOrders", authMiddleware, isAdmin, getAllOrders); // Get all orders (Admin only)
router.delete("/deleteOrder/:orderId", authMiddleware, deleteOrder); // Delete an order

module.exports = router;
