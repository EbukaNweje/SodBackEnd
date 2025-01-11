const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    status: { type: String, default: 'Pending' },
    total: Number
  },{timestamps: true});


  module.exports = Order = mongoose.model('Order', orderSchema)
