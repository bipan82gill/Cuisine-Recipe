const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cuisineRouter = require('./routes/cuisine-routes');
const chefRouter = require('./routes/chef-routes');
const HttpError = require('./models/http-error');

// const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use('/api/cuisines',cuisineRouter);
app.use('/api/chefs',chefRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An Unknown error occured'});
});
mongoose
.connect('mongodb+srv://bipan_gill:jap30milan16@cluster0-b9tsk.mongodb.net/cuisines?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, function() {
        console.log(`server is running http://localhost:3000`);
    });
})
.catch(err => {
    console.log(err);
})

