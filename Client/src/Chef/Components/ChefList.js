import React from 'react';

import ChefItem from './ChefItem';
import Card from '../../Shared/Components/UIElement/Card';
import './ChefList.css';

const ChefList = props =>{
    if(props.items.length === 0){
        return(
        <div className ="center">
            <Card>
                <h1>No Chef is Found</h1>
            </Card>
        </div>
       )   
    }
    return <ul className ="chef-list">
        {props.items.map(chef => (
         <ChefItem 
         key={chef.id} 
         id ={chef.id} 
         image = {chef.image} 
         name={chef.name}
         cuisineCount={chef.cuisines.length} />
         
        ))}
    </ul>
 }

export default ChefList;
