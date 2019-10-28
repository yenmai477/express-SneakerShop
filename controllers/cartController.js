const CartItem = require('../models/CartItemModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.createCartItem = factory.createOne(CartItem);
exports.deleteCartItem = factory.deleteOne(CartItem);
exports.getAllCartItem = factory.getAll(CartItem);
