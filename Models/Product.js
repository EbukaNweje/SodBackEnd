const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
  },{timestamps: true});


  module.exports = Product = mongoose.model('Product', productSchema)
