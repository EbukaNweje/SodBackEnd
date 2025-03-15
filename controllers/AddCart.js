const User = require("../Models/User")

exports.addCart = async (req, res, next)=>{
    const { productId, quantity } = req.body;
    try {
        const user = await User.findById(req.user._id);
        user.cart.push({ productId, quantity });
        await user.save();
        res.send('Added to cart');
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
          });
    }
}