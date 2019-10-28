const mongoose = require('mongoose');

const wishListItemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  variant: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductVariant',
  },
});

wishListItemSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'variant',
    // select: 'name price',
  });
  next();
});

wishListItemSchema.index({ variant: 1, user: 1 }, { unique: true });

const WishListItem = mongoose.model('WishListItem', wishListItemSchema);

module.exports = WishListItem;
