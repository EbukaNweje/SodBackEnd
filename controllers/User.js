const User = require("../Models/User")
const Product = require("../Models/Product")

exports.getoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserData = await User.findById(userId);
        if (!UserData) return res.status(404).json({ message: 'User not found' });
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


exports.allProduct = async (req, res, next)=>{
    try {
        const allproduct = await Product.find()
        res.status(200).json({
            message: "All Product",
            data: allproduct
        })
    } catch (err) {
        next(err)
    }
}

exports.getOneProduct = async (req, res, next)=>{
    try {
        const id = req.params.id
        const oneProduct = await Product.findById(id)
        res.status(200).json({
            message: "One Product",
            data: oneProduct
        })
    } catch (err) {
        next(err)
    }
}
