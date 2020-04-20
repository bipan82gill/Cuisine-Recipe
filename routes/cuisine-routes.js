const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const cuisineControllers = require('../controllers/cuisines-controllers');
const fileUpload = require('../middleware/file-upload');

// route to get cuisine id 
router.get('/:cid', cuisineControllers.getCuisineById);

// route to get cuisine of specific chef 
router.get('/chef/:chefid', cuisineControllers.getCuisinesByChefId);

router.use(checkAuth);

// route to create new cuisine and check validation for title
router.post(
    '/add/recipe',fileUpload.single('image'),
    [
        check('title')
        .not()
        .isEmpty(), 
        check('recipe').isLength({min:5}),
        check('ingredients')
        .not()
        .isEmpty()
    ],
    cuisineControllers.createCuisine);

//route to update cuisine
router.patch('/:cid',
    [
        check('title')
        .not()
        .isEmpty(),
        check('ingredients')
        .not()
        .isEmpty()
    ],
 cuisineControllers.updateCuisine);

//route to delete cuisine
router.delete('/:cid', cuisineControllers.deleteCuisine);

module.exports = router;

