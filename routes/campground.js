const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAysnc');
const campgrounds = require('../controllers/campgrounds');
const { storage } = require('../cloudinary')
const multer = require('multer');
const upload = multer({ storage });

const { isLoggedIn, isAuthor, ValidateCampground } = require('../middleware');


//// validation function

router.route('/').get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), ValidateCampground, catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'),(req,res)=>{ // upload.single('')
    //     console.log(req.body,req.files);
    //     res.send('It worked');
    // })
router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm))

router.route('/:id').get(catchAsync(campgrounds.showCampgrounds))
    .put(isLoggedIn, isAuthor, upload.array('image'), ValidateCampground, catchAsync(campgrounds.UpdateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))





module.exports = router;