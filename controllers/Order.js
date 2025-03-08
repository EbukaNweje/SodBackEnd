const Order = require("../Models/Order");

exports.orders = async (req, res, next)=>{
    try {
        const orders = await Order.find().populate('products.productId');
        res.send(orders);
    } catch (err) {
        next(err)
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const allorders = await Order.find()

        res.status(201).json({
            message: "All Orders",
            maxnumber: allorders.length,
            data: allorders
        })

    }catch (err) {
        next(err)
    }
}

exports.deleteOneOrders = async (req, res, next)=>{
    const { id } = req.params;

    try {
        await Order.findByIdAndDelete(id);
        res.send('Order deleted successfully');
    } catch (err) {
        next(err)
    }
}



