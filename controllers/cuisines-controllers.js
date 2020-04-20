const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Cuisine = require('../models/cuisine');
const Chef = require('../models/chef');

// Function to get Cuisine by Cuisine id 
const getCuisineById = async(req, res, next) => {
        const cuisineId = req.params.cid;
        let cuisine
        try {
            cuisine = await Cuisine.findById(cuisineId);
        }
        catch (err) {
            const error = new HttpError('Something went wrong, could not find a cuisine,Please try again ', 500); 
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
    
    let chefWithCuisines
    try{
        chefWithCuisines = await Chef.findById(chefId).populate('cuisines');
    }
    catch (err){
        const error = new HttpError('Fetching Cuisines failed, Please try again later',500);
        return next(error);
    }

    if(!chefWithCuisines || chefWithCuisines.cuisines.length === 0){
        return next(new HttpError('Could not find a ChefWithCuisines for a provided  chef id.', 404));       
        }
    
    res.json({ cuisines: chefWithCuisines.cuisines.map(cuisine => cuisine.toObject({ getters:true })  ) });
    }

    // create Cuisine route and apply validation 
    const createCuisine = async(req, res, next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(
                new HttpError('Invalid inputs passed, please check your data', 422)
            );
        }
        const {title, recipe, ingredients, creator }= req.body;

        const createCuisine = new Cuisine({
            title,
            recipe,
            image: req.file.path,
            ingredients,
            creator
        });
        let chef;
        try{
            chef = await Chef.findById(creator);

        }catch(err){
            const error = new HttpError('Creating cuisine failed, please try again.',500);
            return next(error);
        }
        if(!chef){
            const error = new HttpError('Could not find chef for this id.',404);
            return next(error);
        }
        try{
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await createCuisine.save({ session: sess});
            chef.cuisines.push(createCuisine);
            await chef.save({ session: sess});
            await sess.commitTransaction();

        } catch (err) {
            const error = new HttpError('Creating cuisine failed, please try again.',500);
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

        const { title, ingredients } = req.body;
        const cuisineId = req.params.cid;
        let cuisine;
        try{
            cuisine = await Cuisine.findById(cuisineId);
        }catch (err){
            const error = new HttpError('Could not update cuisine, something went wrong', 500);
            return next(error);
        }

        cuisine.title = title;
        cuisine.ingredients =ingredients;
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
        //id to delete a cuisine
        const cuisineId = req.params.cid;
        //find a cuisine and check its chef
        let cuisine;
        try{
            cuisine = await Cuisine.findById(cuisineId).populate('creator');
        }catch(err){
            const error = new HttpError('Could not find cuisine to delete', 500);
            return next(error);
        }
        // if cuisine does not exist send error
        if(!cuisine){
            const error = new HttpError('Could not find cuisine for this id', 404);
            return next(error); 
        }
        const imagePath = cuisine.image;
        // for deleting specific cuisine use a session for this transaction 
        try{
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await cuisine.remove({ session : sess});
            cuisine.creator.cuisines.pull(cuisine);
            await cuisine.creator.save({ session:sess});
            await sess.commitTransaction();
        }
        //if transaction fails send this error
        catch(err){
            const error = new HttpError('Could not find cuisine to delete', 500);
            return next(error);
        }
        fs.unlink(imagePath, err => {
            console.log(err);
        })
        //if transaction successful send this respond
        res.status(200).json({ message: "Deleting Cuisine ...."});
    }

    exports.getCuisineById = getCuisineById;
    exports.getCuisinesByChefId = getCuisinesByChefId;
    exports.createCuisine = createCuisine;
    exports.updateCuisine = updateCuisine;
    exports.deleteCuisine = deleteCuisine;