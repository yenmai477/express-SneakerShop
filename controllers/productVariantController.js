const ProductVariant = require('./../models/productVariantModel');
const catchAsync = require('./../utils/catchAsync');
//const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllProductVariant = factory.getAll(ProductVariant);
exports.getProductVariant = factory.getOne(ProductVariant);
exports.createProductVariant = factory.createOne(ProductVariant);
exports.updateProductVariant = factory.updateOne(ProductVariant);
exports.deleteProductVariant = factory.deleteOne(ProductVariant);

// TODO: 10/17/19  Get all variation of product
exports.getAllVariation = catchAsync(async (req, res, next) => {
  // To allow for nested GET attributes on product (hack)
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId };

  const features = new APIFeatures(ProductVariant.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  //Modify data for front-end
  /**
   * {
   *    color: [{size: , quantity}]
   * }
   */

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
