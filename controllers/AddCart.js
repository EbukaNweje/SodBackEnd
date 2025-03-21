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

exports.getCart = async (req, res, next)=>{
    try {
        const user = await User.findById(req.user._id).populate('cart.productId');
        if (!user) return res.status(404).send('User not found');
        res.send(user.cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
          });
    }

}

exports.deleteoneCart = async (req, res, next)=>{
    const { productId } = req.params;
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send('User not found');
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.send('Deleted from cart');
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
          });
    }
}