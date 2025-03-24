const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String},
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    products: [{ productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, quantity: Number, size: [{type:String}] }],
    status: { type: String, default: 'Pending' },
    total: Number
  },{timestamps: true});


  module.exports = Order = mongoose.model('Order', orderSchema)
