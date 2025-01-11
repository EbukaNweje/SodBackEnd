const User = require("../Models/User")

exports.deposit = async (req, res, next)=>{
    const { amount } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.deposit += amount;
        await user.save();
        res.send('Deposit successful');
    } catch (err) {
        next(err);
    }
}