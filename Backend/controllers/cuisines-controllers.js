const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

let Cuisines =[
    {
        id :'C1',
        title: 'Gulab Jamun',
        recipe:'shcdvdvdjfheriu',
        url_video: 'bsdyuewhdcue',
        creator : 'u1'
    }
];

const getCuisineById = (req, res, next) =>{
    const cuisineId = req.params.cid; // cuisine id 

    const cuisine = Cuisines.find(c =>{
        return c.id === cuisineId;
    });

    if(!cuisine){
        throw new HttpError('Could not find a cuisine for this id', 404);
    }
    res.json({ cuisine });
};

const getCuisineByChefId = (req, res, next) => {
    const chefId = req.params.chefid;

    const cuisine = Cuisines.find(c =>{
        return c.creator ===chefId;
    });

    if(!cuisine){
        return next(
            newHttpError('Could not find a cuisine for provided chef id', 404)
        );
    }
    res.json({ cuisine });
};

const createCuisine = (req, res, next) => {
    const { title, recipe, url_video, creator } = req.body;

    const createCuisine = {
        id: uuid(),
        title,
        recipe,
        url_video, 
        creator
    };
    Cuisines.push(createCuisine);

    res.status(201).json({ cuisine: createCuisine});
};

const

