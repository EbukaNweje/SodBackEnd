const User = require("../Models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
// const createError = require("../utilities/error");



exports.register = async (req, res, next)=>{
    try{    
        const { username, fullName, email, password } = req.body;
        console.log(req.body);
        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        
        const user = new User({ username, fullName, email, password });
        console.log(user);
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            data: user
        })

    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.login = async (req, res, next)=>{
    try{    
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email:email });
        
        if (!user) return res.status(404).send('User not found');
        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword);
        if (!validPassword) return res.status(400).send('Invalid password');
        const token = jwt.sign({ _id: user._id }, 'secret-key');

        res.header('Authorization', token).status(201).json({
            message: "Logged in",
            data: user,
            token
        })

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
