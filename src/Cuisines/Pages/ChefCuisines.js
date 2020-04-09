import React from 'react';
import {useParams} from 'react-router-dom';

import CuisineList from '../Components/CuisineList';

const Cuisines=[
    {
    id:"CU1",
    title:"Gulab Jamun",
    image:"https://baliindiancuisine.com/wp-content/uploads/2015/11/Sanjeev-Kapoor-indian-recipe-of-gulab-jamun-452x262.jpg",
    recipe:"fjhdjfhejf jehfueirhf hejhferhguerd",
    creator:"C1"
}
]

const ChefCuisines =() =>{
    const chefId = useParams().chefId;
    const loadedCuisines = Cuisines.filter(cuisine => cuisine.creator === chefId);
    return <CuisineList items={loadedCuisines} />
}

export default ChefCuisines;
