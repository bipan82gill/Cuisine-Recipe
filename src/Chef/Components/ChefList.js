import React from 'react';
import './ChefList.css';
import ChefItem from './ChefItem';

const ChefList = props =>{
    if(props.items.length === 0){
        return(
        <div className ="center">
            <h1>No Chef is Found</h1>
        </div>
       )   
    }
    return <ul>
        {props.items.map(chef => (
         <ChefItem 
         key={chef.id} 
         id ={chef.id} 
         image = {chef.image} 
         name={chef.name}
         cuisineCount={chef.cuisines} />
         
        ))}
    </ul>
 }

export default ChefList;
