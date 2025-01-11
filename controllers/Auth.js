const User = require("../Models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {validationResult } = require('express-validator');
const createError = require("../utilities/error");


exports.register = async (req, res, next)=>{
    try{    
        const { username, fullName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, fullName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            data: user
        })

    }catch(err){
        next(err)
    }
}

exports.login = async (req, res, next)=>{
    try{    
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');
        const token = jwt.sign({ _id: user._id }, 'secret');
        res.header('Authorization', token).send('Logged in');

    }catch(err){
        next(err)
    }
}

exports.changepassword = async (req, res, next)=>{
    const { newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send('Password changed successfully');
    } catch (err) {
        next(err)
    }
}
