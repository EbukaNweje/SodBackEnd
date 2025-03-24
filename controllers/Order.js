const Order = require("../Models/Order");
const User = require("../Models/User");


exports.placeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart.productId");
        if (!user || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total price
        let totalPrice = user.cart.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

        // Create order object
        const order = new Order({
            userId: user._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            apartment: req.body.apartment,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            phone: req.body.phone,
            products: user.cart.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                size: item.size,
                price: item.productId.price
            })),
            total: totalPrice
        });

        // Save order to database
        await order.save();

        // Clear user's cart after order is placed
        user.cart = [];
        await user.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
};


exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate("products.productId");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("products.productId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
};

