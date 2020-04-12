const express = require('express');

const router = express.Router();

const chefControllers = require('../controllers/chef-controllers');

// route to get chef information
router.get('/', chefControllers.getChefs);

// route to signup
router.post('/signup', chefControllers.signup);

// route for login 
router.post('/login', chefControllers.login);

module.exports = router;

