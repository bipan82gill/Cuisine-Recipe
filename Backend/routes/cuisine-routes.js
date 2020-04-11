const express = require('express');

const router = express.Router();

const cuisineControllers = require('../controllers/cuisines-controllers');

// route to get cuisine id 
router.get('/:cid', cuisineControllers.getCuisineById);

// route to get cuisine of specific chef 
router.get('/chef/:chefid', cuisineControllers.getCuisineByChefId);


module.exports = router;

