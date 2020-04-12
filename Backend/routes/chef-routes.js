const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const chefControllers = require('../controllers/chef-controllers');

// route to get chef information
router.get('/', chefControllers.getChefs);

// route to signup
router.post('/signup',
    [
        check('name')
        .not()
        .isEmpty(),
        check('email')
        .normalizeEmail()
        .isEmail(),
        check('password')
        .isLength({min:6})
    ],
    chefControllers.signup);

// route for login 
router.post('/login', chefControllers.login);

module.exports = router;

