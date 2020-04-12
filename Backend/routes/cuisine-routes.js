const express = require('express');

const router = express.Router();

const cuisineControllers = require('../controllers/cuisines-controllers');

// route to get cuisine id 
router.get('/:cid', cuisineControllers.getCuisineById);

// route to get cuisine of specific chef 
router.get('/chef/:chefid', cuisineControllers.getCuisinesByChefId);

// route to create new cuisine
router.post('/', cuisineControllers.createCuisine);

//route to update cuisine
router.patch('/:cid', cuisineControllers.updateCuisine);

//route to delete cuisine
router.delete('/:cid', cuisineControllers.deleteCuisine);

module.exports = router;

