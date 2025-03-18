const jwt = require('jsonwebtoken');
const Admin = require("../Models/Admin");
const Product = require("../Models/Product");
const User = require("../Models/User");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");


exports.register = async (req, res, next)=>{
    try{    
        const {fullName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Admin({fullName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            message: "Admin registered successfully",
            data: Admin
        })

    }catch(err){
        next(err)
    }
}

exports.login = async (req, res, next)=>{
    try{    
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');
        const token = jwt.sign({ _id: user._id }, 'secret');
        res.header('Authorization', token).status(201).json({
            message: "Logged in",
            data: user,
            token
        })

    }catch(err){
        next(err)
    }
}

exports.addProduct = async (req, res)=>{
    const { name, price, description, category, quantity, size} = req.body;
    try {
        const image = req.file.path;
        const sizes = req.body.size.split(',').map(size => size.trim());
        // console.log(req.body);
        const uploadResponse = await cloudinary.uploader.upload(image);
        const productData = {
            name,
            price,
            description,
            category,
            quantity,
            size: sizes
        };
        const product = new Product(productData);
        product.image = uploadResponse.secure_url;
        await product.save();

        // console.log(product);

        res.status(201).json({
            message: 'Product added successfully',
            product
          });

    } catch (error) {
        // next(error)
        res.status(500).json({
            message: error.message,
            error
          });
    }

}

exports.upddataoneProduct = async (req, res, next)=>{
    const { id } = req.params;
    const updates = req.body;

    try {
        await Product.findByIdAndUpdate(id, updates);
        res.send('Product updated successfully');
    } catch (err) {
        next(err);
    }
}

exports.deletedOneProduct = async (req, res, next)=>{
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.send('Product deleted successfully');
    } catch (err) {
        next(err)
    }
}

exports.sendUserEmail = async (req, res, next)=>{
    const { id } = req.params;
    const { subject, text } = req.body;

    try {
        const user = await User.findById(id);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password'
            }
        });

        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: user.email,
            subject,
            text
        });

        res.send('Email sent successfully');
    } catch (err) {
        res.status(400).send('Error sending email');
    }
}


exports.confirmOrder = async (req, res, next)=>{
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        order.status = 'Confirmed';
        await order.save();
        res.send('Order confirmed successfully');
    } catch (err) {
        next(err)
    }
}

exports.getadmin = async (req, res, next)=>{
    try {
        const admin = await Admin.findById(req.params.id);
        res.send(admin);
    } catch (err) {
        next(err)
    }
}