const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    products: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }]

});

module.exports = Category = mongoose.model('Category', categorySchema);
