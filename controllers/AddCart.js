const User = require("../Models/User")

exports.addCart = async (req, res, next)=>{
    const { productId, quantity } = req.body;
    try {
        // console.log(req.user);
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send('User not found');
        user.cart.push({ productId, quantity });
        // console.log(user)
        
        await user.save();
        res.send('Added to cart');
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
          });
    }
}