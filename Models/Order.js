const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Store user reference
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            size: [{ type: String }],
            price: Number, // Store product price at the time of purchase
        }
    ],
    status: { type: String, default: 'Pending' }, // Order status: Pending, Shipped, Delivered, etc.
    total: { type: Number, required: true }, // Store order total amount
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
