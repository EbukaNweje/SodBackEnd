const User = require("../Models/User")

exports.history = async (req, res, next)=>{
    try {
        const user = await User.findById(req.user.id).populate('history.orderId');
        res.send(user.history);
    } catch (err) {
        next(err)
    }
}