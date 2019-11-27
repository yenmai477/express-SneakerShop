const mongoose = require('mongoose');
const CartItem = require('../models/CartItemModel');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide us with the consignee's name"],
  },
  address: {
    type: String,
    required: [true, "Please provide us with the consignee's address"],
  },
  phone: {
    type: String,
    required: [true, "Please provide us with the consignee's phone"],
  },
  note: {
    type: String,
  },
  variants: [
    {
      variant: {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductVariant',
        required: [true, 'Order must belong to a product!'],
      },
      quantity: {
        type: Number,
        required: [true, 'Please tell us quantity of product'],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a User!'],
  },
  price: {
    type: Number,
    require: [true, 'Order must have a price.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

orderSchema.pre(/^find/, function(next) {
  this.populate({ path: 'user', select: 'name photo' }).populate({
    path: 'variants.variant',
    // select: 'name',
  });
  next();
});

orderSchema.statics.clearCartItem = async function(userId) {
  await CartItem.deleteMany({ user: userId });
};

orderSchema.post('save', function() {
  this.constructor.clearCartItem(this.user);
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
