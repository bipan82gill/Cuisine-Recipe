const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');


// dummy data to retrieve data for checking routes
    const Cuisines = [
        {
        id: 'c1',
        title: 'Samosa',
        recipe : ' shcehrfyuerh dbwhduewhf ',
        creator: 'u1'
        }
    ];

// Function to get Cuisine by Cuisine id 
const getCuisineById = (req, res, next) => {
        const cuisineId = req.params.cid;
    
        const cuisine = Cuisines.find(cuisine => {
            return cuisine.id === cuisineId;
        });
    
        if(!cuisine) {
            throw  new HttpError('Could not find a cuisine for a provided cuisine id.', 404);   
        }
    
        res.json({ cuisine });
    }
// Function to get cuisine by Chef id
const getCuisineByChefId = (req, res, next) => {
    const chefId = req.params.chefid;

    const cuisine = Cuisines.find(cuisine => {
        return cuisine.creator === chefId;
    });

    if(!cuisine){
        return next(new HttpError('Could not find a cuisine for a provided  chef id.', 404));       
        }
    
    res.json({ cuisine });
    }

    // create Cuisine route 
    const createCuisine = (req, res, next) => {
      const { title, recipe, creator } = req.body;
      
        const newCuisine = {
            id: uuid(),
            title,
            recipe, 
            creator 
        }
        Cuisines.push(newCuisine);

        res.status(200).json(newCuisine);
    }

    exports.getCuisineById = getCuisineById;
    exports.getCuisineByChefId = getCuisineByChefId;
    exports.createCuisine = createCuisine;