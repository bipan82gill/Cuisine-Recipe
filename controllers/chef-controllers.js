const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Chef = require('../models/chef');


// Function to get data of all chefs
const getChefs = async(req, res, next) => {
    let chefs;
    try{
        chefs = await Chef.find({},'-password');
    }catch (err){
        const error = new HttpError('Fail to find Chef, try again ',500);
        return next(error);
    }

    res.json({chefs: chefs.map(chef => chef.toObject({ getters:true}) ) });
}

// function to signup new chef 
const signup = async(req, res, next) => {
   
    const errors=  validationResult(req);

        if(!errors.isEmpty()){
    
            return next(
                new HttpError('Invalid input passed, please check your data', 422)) 
        }

    const { name, email, image, password } = req.body;
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

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12)
    }catch(err){
        const error = new HttpError(
            'Could not create chef, please try again',
            500
        );
        return next(error);
    }

    const newChef = new Chef({
       name,
       email,
       image: req.file.path ,
       password: hashedPassword,
       cuisines:[]
    });
    try{
        await newChef.save();
    } catch (err){
        const error = new HttpError('Could not signup a chef, please try again', 500);
        return next(error);
    }
    let token;
    try{
        token = jwt.sign({ chefId:newChef.id, email: newChef.email},
            'supersecret_dont_share',
            { expiresIn:'1h'})   
    }catch(err){
        const error = new HttpError('Could not signup a chef, please try again', 500);
        return next(error);
    }
   
    res.status(201).json({ chefId: newChef.id, email:newChef.email, token:token});  
}

// Function to login 
const login = async(req, res, next) => {
    const { email, password } = req.body;

    let existingChef
    try{
        existingChef = await Chef.findOne({ email :email });
    } catch (err){
        const error = new HttpError('Logging is Failed , please try again',500);
        return next(error);
    }
    
    if(!existingChef){
        const error =new HttpError('Could not identify chef, credentials seem to be wrong', 403);
        return next(error);
    }
    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password, existingChef.password);
    }catch(err){
        const error = new HttpError('Could not Login, check credentials, please try again',500);
        return next(error);
    }
    if(!isValidPassword){
        const error =new HttpError('Could not identify chef, credentials seem to be wrong', 401);
        return next(error);
    }

    let token;
    try{
        token = jwt.sign({ chefId:existingChef.id, email: existingChef.email},
            'supersecret_dont_share',
            { expiresIn:'1h'})   
    }catch(err){
        const error = new HttpError('Logging is failed, please try again', 500);
        return next(error);
    }
    res.json({ chefId:existingChef.id, email:existingChef.email, token:token })
}

exports.getChefs = getChefs;
exports.signup = signup;
exports.login = login;