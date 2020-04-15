const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Chef = require('../models/chef');

const Chef_Data =[
    {
        id: "c1",
        name : "Sanjeev Kapoor",
        email: "sanjeev@gmail.com",
        password: "san123"
    }
];

// Function to get data of all chefs
const getChefs = (req, res, next) => {
    res.json({chefs: Chef_Data});
}

// function to signup new chef 
const signup = async(req, res, next) => {
    const errors=  validationResult(req);

        if(!errors.isEmpty()){
    
            return next(
                new HttpError('Invalid input passed, please check your data', 422)) 
        }

    const { name, email, password , cuisines } = req.body;
    // Check for Chef is exist already 
    let existingChef
    try{
        existingChef = await Chef.findOne({ email :email });
    } catch (err){
        const error = new HttpError('Failed signup, please try again later',500);
        return next(error);
    }
    if(existingChef){
        const error = new HttpError('Chef exists already, Please login instead',422);
        return next(error);
    }

    const newChef = new Chef({
       name,
       email,
       image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2012/11/gulab-jamun-recipe-480x270.jpg",
       password,
       cuisines
    });
    try{
        await newChef.save();
    } catch (err){
        const error = new HttpError('Could not signup a chef, please try again', 500);
        return next(error);
    }
    res.status(201).json({ chef: newChef.toObject({ getters:true }) });  
}

// Function to login 
const login = async(req, res, next) => {
    const { email, password } = req.body;

    let existingChef
    try{
        existingChef = await Chef.findOne({ email :email });
    } catch (err){
        const error = new HttpError('Logged in Failed , please try again',500);
        return next(error);
    }
    
    if(!existingChef || existingChef.password !== password){
        const error =new HttpError('Could not identify chef, credentials seem to be wrong', 401);
        return next(error);
    }
    res.json({message: "Logged in !!!"})



}

exports.getChefs = getChefs;
exports.signup = signup;
exports.login = login;