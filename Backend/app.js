const express = require('express');
const bodyParser = require('body-parser');
const cuisineRouter = require('./routes/cuisine-routes');

const app = express();

app.use('/api/cuisines',cuisineRouter);

app.listen(3000);