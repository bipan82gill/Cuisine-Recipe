import React, {useState} from 'react';

import Card from "../../Shared/Components/UIElement/Card";
import Button from "../../Shared/Components/UIElement/FormComponents/Button";
import Modal from "../../Shared/Components/UIElement/Modal";
import './CuisineItem.css';

const CuisineItem = props =>{
    const [showRecipe, setShowRecipe]= useState(false);

   const openRecipeHandler = () => setShowRecipe(true);

   const closeRecipeHandler = () => setShowRecipe(false);

    return (
        <React.Fragment>
        <Modal 
            show = {showRecipe} 
            onCancel ={closeRecipeHandler} 
            header ={props.title} 
            contentClass="cuisine-item__modal-content"
            footerClass ="cuisine-item__modal-actions"
            footer={<Button onClick={closeRecipeHandler}>CLOSE</Button>}>
                <div className ="recipe-container">
                    <h2>The Recipe !</h2>
                </div>
        </Modal>
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
                    <Button inverse onClick={openRecipeHandler}>WATCH VIDEO</Button>
                    <Button to={`/cuisines/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
                
            </Card>
        </li>
    </React.Fragment>
    );

}

export default CuisineItem;