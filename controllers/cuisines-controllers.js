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
const getCuisineById = async(req, res, next) => {
        const cuisineId = req.params.cid;
        let cuisine
        try {
            cuisine = await Cuisine.findById(cuisineId);
        }
        catch (err) {
            const error = new HttpError('Something went wrong, could not find a cuisine', 500); 
            return next(error);  
        }

        if(!cuisine) {
            const error = new HttpError('Could not find a cuisine for a provided cuisine id.', 404);
            return next(error);
        }
        res.json({ cuisine: cuisine.toObject( { getters:true}) });
    }

// Function to get cuisine by Chef id

const getCuisinesByChefId = async (req, res, next) => {
    const chefId = req.params.chefid;
    
    let cuisines
    try{
      cuisines = await Cuisine.find({ creator: chefId})
    }
    catch (err){
        const error = new HttpError('Fetching Cuisines failed, Please try again later',500);
        return next(error);
    }

    if(!cuisines || cuisines.length === 0){
        return next(new HttpError('Could not find a cuisines for a provided  chef id.', 404));       
        }
    
    res.json({ cuisines: cuisines.map(cuisine => cuisine.toObject({ getters:true })  ) });
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
    const updateCuisine = async (req, res, next) =>{
        const errors=  validationResult(req);

        if(!errors.isEmpty()){
            console.log(errors);
            throw new HttpError('Invalid input passed, please check your data', 422);
        }

        const { title, recipe } = req.body;
        const cuisineId = req.params.cid;
        let cuisine;
        try{
            cuisine = await Cuisine.findById(cuisineId);
        }catch (err){
            const error = new HttpError('Could not update cuisine, something went wrong', 500);
            return next(error);
        }

        cuisine.title = title;
        cuisine.recipe =recipe;
        try {
          await cuisine.save();
        } catch (err) {
            const error = new HttpError('Something went wrong, could not update cuisine',500);
            return next(error);
        }

        res.status(200).json({ cuisine: cuisine.toObject({ getters:true }) });
    }

    // Function to create route for deleting cuisine
    const deleteCuisine = async(req, res, next) => {
        const cuisineId = req.params.cid;

        let cuisine;
        try{
            cuisine = await Cuisine.findById(cuisineId);
        }catch(err){
            const error = new HttpError('Could not find cuisine to delete', 500);
            return next(error);
        }
        try{
            await cuisine.remove();
        }catch(err){
            const error = new HttpError('Could not find cuisine to delete', 500);
            return next(error);
        }
        res.status(200).json({ message: "Deleting Cuisine ...."});
    }

    exports.getCuisineById = getCuisineById;
    exports.getCuisinesByChefId = getCuisinesByChefId;
    exports.createCuisine = createCuisine;
    exports.updateCuisine = updateCuisine;
    exports.deleteCuisine = deleteCuisine;