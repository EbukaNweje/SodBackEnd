const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, default: true}
  },{timestamps: true});



  module.exports = Admin = mongoose.model('Admin', adminSchema)
