import React from 'react';
import Card from "../../Shared/Components/UIElement/Card";
import Button from "../../Shared/Components/UIElement/FormComponents/Button";
import './CuisineItem.css';

const CuisineItem = props =>{
    return (
    <li className="cuisine-item">
        <Card className="cuisine-item__content">
            <div className ="cuisine-item__image">
                <img src={props.image} alt={props.title} />
            </div>
            <div className ="cuisine-item__info">
                <h2>{props.title}</h2>
                <p>{props.recipe}</p>
            </div>
            <div className="cuisine-item__actions">
                <Button inverse>WATCH VIDEO</Button>
                <Button to={`/cuisines/${props.id}`}>EDIT</Button>
                <Button danger>DELETE</Button>
            </div>
        </Card>
    </li>
    )

}

export default CuisineItem;