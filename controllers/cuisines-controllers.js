const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Cuisine = require('../models/cuisine');


// dummy data to retrieve data for checking routes
    let Cuisines = [
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

const getCuisinesByChefId = (req, res, next) => {
    const chefId = req.params.chefid;

    const cuisines = Cuisines.filter(cuisine => {
        return cuisine.creator === chefId;
    });

    if(!cuisines || cuisines.length === 0){
        return next(new HttpError('Could not find a cuisines for a provided  chef id.', 404));       
        }
    
    res.json({ cuisines });
    }

    // create Cuisine route and apply validation 
    const createCuisine = async(req, res, next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(
                new HttpError('Input inputs passed, please check your data', 422)
            );
        }
        const {title, recipe, creator }= req.body;
    const createCuisine = new Cuisine({
        title,
        recipe,
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2012/11/gulab-jamun-recipe-480x270.jpg",
        url_video: "https://www.youtube.com/watch?v=ofedNWj43bY",
        creator
    });
        try{
            await createCuisine.save();    
        } catch (err) {
            const error = new HttpError('Creating place failed, please try again.',500);
            return next(error);
        }

        res.status(201).json({ cuisine: createCuisine});
};
    // Function to create route for updating cuisine
    const updateCuisine = (req, res, next) =>{
        const errors=  validationResult(req);

        if(!errors.isEmpty()){
            console.log(errors);
            throw new HttpError('Invalid input passed, please check your data', 422);
        }

        const { title, recipe } = req.body;
        const cuisineId = req.params.cid;

        const updatedCuisine = { ...Cuisines.find( cuisine => cuisine.id === cuisineId)}
        const cuisineIndex = Cuisines.findIndex( cuisine => cuisine.id === cuisineId);

        updatedCuisine.title = title;
        updatedCuisine.recipe =recipe;

        Cuisines[cuisineIndex] = updatedCuisine;

        res.status(200).json({cuisine:updatedCuisine});
    }

    // Function to create route for deleting cuisine
    const deleteCuisine = (req, res, next) => {
        const cuisineId = req.params.cid;
        if(!Cuisines.find(c => c.id === cuisineId))
            throw new HttpError('Could not find a id for delete a cuisine', 404);
        Cuisines = Cuisines.filter(cuisine => cuisine.id !== cuisineId);
        res.status(200).json({ message: "Deleting Cuisine ...."});
    }

    exports.getCuisineById = getCuisineById;
    exports.getCuisinesByChefId = getCuisinesByChefId;
    exports.createCuisine = createCuisine;
    exports.updateCuisine = updateCuisine;
    exports.deleteCuisine = deleteCuisine;