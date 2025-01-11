const User = require("../Models/User")

exports.getoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserData = await User.findById(userId)
        res.status(201).json({
            message: "User Data",
            data: UserData
        })

    }catch(err){
        next(err)
    }
}

exports.deleteoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserDatadelete = await User.findByIdAndDelete(userId)
        
        res.status(200).json({
            message: "User Data have been deleted",
            data: UserDatadelete
        })

    }catch(err){
        next(err)
    }
}

exports.updateoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserDataupdate= await User.findByIdAndUpdate(userId,req.body,{
            new: true
        })
        
        res.status(201).json({
            message: "User Data have been Updated",
            data: UserDataupdate
        })

    }catch(err){
        next(err)
    }
}
exports.userHistory = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user.id).populate('history.orderId');
        res.send(user.history);
    } catch (err) {
        next(err)
    }
}
