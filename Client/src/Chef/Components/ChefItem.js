import React from 'react';
import {Link} from 'react-router-dom';

import Avatar from '../../Shared/Components/UIElement/Avatar';
import Card from '../../Shared/Components/UIElement/Card';
import './ChefItem.css';

const ChefItem = props =>{
    return( 
        
    <li className="chef-item">
      
            <Card className ="chef-item__content">
                <Link to={`/${props.id}/cuisines`}>
                <div className ="chef-item__image">
                    <Avatar image={props.image} alt={props.alt}/>
                </div>
                <div className ="chef-item__info">
                    <h2>{props.name}</h2>
                    <h3>{props.cuisineCount} {props.cuisineCount === 1 ? 'cuisine' :'cuisines'}</h3>
                </div>
                </Link>
            </Card>
    </li>
    )
 }

export default ChefItem;