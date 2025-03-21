const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{ productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, quantity: Number, size: [{type:String}] }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    balance: { type: Number, default: 0 }
  },{timestamps: true});

  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

  module.exports = User = mongoose.model('User', userSchema)
