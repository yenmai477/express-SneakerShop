const CartItem = require('../models/CartItemModel');
const factory = require('./handlerFactory');

exports.createCartItem = factory.createOne(CartItem);
exports.deleteCartItem = factory.deleteOne(CartItem);
exports.getAllCartItem = factory.getAll(CartItem);
