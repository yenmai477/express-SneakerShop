const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  gender: {
    type: String,
    required: [true, 'Please provide your gender'],
  },
  birthday: {
    type: Date,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
  },
  biography: {
    type: String,
  },
  interestedIn: {
    type: String,
  },
  config: {
    gender: {
      type: String,
      default: 'all',
    },
    distance: {
      type: Number,
      default: 20,
    },
    ageRange: {
      type: Array,
      default: [18, 40],
    },
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  like: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  dislike: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  likeMe: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
