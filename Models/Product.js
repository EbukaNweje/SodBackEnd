const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    // size: [{ type: String, required: true }],
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
  },{timestamps: true});

 const Product =  mongoose.model('Product', productSchema)

 module.exports = Product

