const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

module.exports = Category = mongoose.model('Category', categorySchema);
