const express = require('express');
const bodyParser = require('body-parser');

const cuisineRouter = require('./routes/cuisine-routes');

const app = express();

app.use('/api/cuisines',cuisineRouter);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An Unknown error occured'});
});

app.listen(3000);