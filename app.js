const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config()


const cuisineRouter = require('./routes/cuisine-routes');
const chefRouter = require('./routes/chef-routes');
const HttpError = require('./models/http-error');

const PORT = process.env.PORT||5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.get("/,*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.use('/uploads/images', express.static(path.join('uploads','images')))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
//     next();
//   });
app.use('/api/cuisines',cuisineRouter);
app.use('/api/chefs',chefRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, err =>{
            console.log(err);
        })
    }
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An Unknown error occured'});
});
mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-envva.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
{ useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=>{
    app.listen(5000, function() {
        console.log(`server is running http://localhost:5000`);
    });
})
.catch(err => {
    console.log(err);
})

