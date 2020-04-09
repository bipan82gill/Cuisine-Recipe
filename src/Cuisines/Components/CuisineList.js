import React from 'react';

import Card from '../../Shared/Components/UIElement/Card';
import './CuisineItem';
import CuisineItem from './CuisineItem';
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import './CuisineList.css';

const CuisineList = props => {
        if(props.items.length === 0){
            return (
            <div className ="cuisine-list-center">
                <Card>
                <h2> No Cuisines Found</h2>
                <Button to='/add/recipe'> 
                    ADD CUISINE
                </Button>
                </Card>
            </div>
            )
        }
        return( 
        <ul className ="cuisine-list">
            {props.items.map(cuisine=>(
            <CuisineItem
                 key={cuisine.id}
                 id={cuisine.id}
                 image ={cuisine.image} 
                 title={cuisine.title}
                 recipe={cuisine.recipe}
                 creatorId={cuisine.creator}
            />
            ))};
        </ul>
        );
}
export default CuisineList;