const mongoose = require('mongoose');

const productVariantSchema = mongoose.Schema({
  product: {
    type: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  },
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
  quantity: {
    type: Number,
    min: [0, 'Quantity must be quantity must be greater than or equal to 0'],
  },
});

const productVariant = mongoose.model('ProductVariant', productVariantSchema);

module.exports = productVariant;
