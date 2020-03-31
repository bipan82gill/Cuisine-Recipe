import React from 'react';
import './ChefItem.css';
const ChefItem = props =>{
    return( 
    <li className="chef-item">
        <div className ="chef-item__content">
            <div className ="chef-item__image">
                <img src={props.image} alt={props.name} />
            </div>
            <div className ="chef-item__info">
                <h2>{props.name}</h2>
                <h3>{props.cuisineCount} {props.cuisineCount === 1 ? 'cuisine' :'cuisines'}</h3>
            </div>
        </div>
    </li>
    )
 }

export default ChefItem;