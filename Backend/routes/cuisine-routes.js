const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();
// dummy data to retrieve data for checking routes
const Cuisines = [
    {
    id: 'c1',
    title: 'Samosa',
    recipe : ' shcehrfyuerh dbwhduewhf ',
    creator: 'u1'
    }
];
// route to get cuisine id 
router.get('/:cid', (req, res, next) => {
    const cuisineId = req.params.cid;

    const cuisine = Cuisines.find(cuisine => {
        return cuisine.id === cuisineId;
    });

    if(!cuisine) {
        throw  new HttpError('Could not find a cuisine for a provided cuisine id.', 404);   
    }

    res.json({ cuisine });
});

// route to get cuisine of specific chef 
router.get('/chef/:chefid', (req, res, next) => {
    const chefId = req.params.chefid;

    const cuisine = Cuisines.find(cuisine => {
        return cuisine.creator === chefId;
    });

    if(!cuisine){
        return next(new HttpError('Could not find a cuisine for a provided  chef id.', 404));       
    }
    
    res.json({ cuisine });
})
module.exports = router;

