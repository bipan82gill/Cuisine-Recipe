const express = require('express');

const router = express.Router();

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
    res.json({ cuisine });
});

// route to get cuisine of specific chef 
router.get('/chef/:chefid', (req, res, next) => {
    const chefId = req.params.chefid;
    const cuisine = Cuisines.find(cuisine => {
        return cuisine.creator === chefId;
    });
    res.json({ cuisine });
})
module.exports = router;

