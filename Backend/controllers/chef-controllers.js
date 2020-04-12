const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
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
const signup = (req, res, next) => {
    const { name, email, password } = req.body;
    const newChef = {
        id: uuid(),
        name,
        email,
        password
    }
    Chef_Data.push(newChef);
    res.status(200).json({Chef: newChef});  
}

// Function to login 
const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedChef = Chef_Data.find(c => c.email === email);
    if(!identifiedChef || identifiedChef.password !== password){
        throw new HttpError('Could not identify chef, credentials seem to be wrong', 401);
    }
    res.json({message: "Logged in !!!"})



}

exports.getChefs = getChefs;
exports.signup = signup;
exports.login = login;