import React, { useState, useContext } from 'react';

import Card from "../../Shared/Components/UIElement/Card";
import Button from "../../Shared/Components/UIElement/FormComponents/Button";
import Modal from "../../Shared/Components/UIElement/Modal";
import {AuthContext} from '../../Shared/Context/Auth-context';
import './CuisineItem.css';

const CuisineItem = props =>{
    const auth = useContext(AuthContext);
    const [showRecipe, setShowRecipe]= useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

   const openRecipeHandler = () => setShowRecipe(true);

   const closeRecipeHandler = () => setShowRecipe(false);

   const showDeleteWarningHandler = () =>{
        setShowConfirmModal(true);
   };
   const cancelDeleteHandler = () => {
       setShowConfirmModal(false);
   }

   const confirmDeleteHandler = () => { 
    setShowConfirmModal(false);   
    console.log('DELETING...');
    }

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
        <Modal 
        show ={showConfirmModal}
        onCancel ={cancelDeleteHandler}
        header ="Are you sure?" 
        footerClass="cuisine-item__modal-actions" 
        footer={
            <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}>Delete</Button>
            </React.Fragment>
        }>
            <p>Do you want to Delete this cuisine? You can not restore it.</p>
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
                    {auth.isLoggedIn && <Button to={`/cuisines/${props.id}`}>EDIT</Button>}
                    {auth.isLoggedIn && <Button danger onClick = {showDeleteWarningHandler}>DELETE</Button>}
                </div>
                
            </Card>
        </li>
    </React.Fragment>
    );

}

export default CuisineItem;