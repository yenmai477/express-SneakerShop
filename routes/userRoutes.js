const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.get('/me', userController.getMe, userController.getUser);
router.post('/addToCart', cartController.createCartItem);
router.delete('/removeFromCart/:id', cartController.deleteCartItem);
router.get('/cart', userController.getMe, cartController.getAllCartItem);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;