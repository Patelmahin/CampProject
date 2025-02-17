const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAysnc');
const Campground = require('../models/campground');
const Review = require('../models/review');
const{validateReview,isLoggedIn,isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');





//review 
router.post('/' ,isLoggedIn,validateReview,catchAsync(reviews.createReview))
 
 router.delete('/:reviewId',isReviewAuthor,isLoggedIn,catchAsync(reviews.deleteReview))
 module.exports = router;