import React, { useState, useContext } from 'react';
import ReactPlayer from 'react-player';

import Card from "../../Shared/Components/UIElement/Card";
import Button from "../../Shared/Components/UIElement/FormComponents/Button";
import Modal from "../../Shared/Components/UIElement/Modal";
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import { AuthContext } from '../../Shared/Context/Auth-context';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import './CuisineItem.css';

const CuisineItem = props =>{
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

   const confirmDeleteHandler = async() => { 
    setShowConfirmModal(false);  
    try{
        await sendRequest(`
        /api/cuisines/${props.id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + auth.token }
        )
        props.onDelete(props.id);
       }catch(err){} 
    console.log('DELETING...');
    }

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear ={clearError}/>
        <Modal 
            show = {showRecipe} 
            onCancel ={closeRecipeHandler} 
            header ={props.title} 
            contentClass="cuisine-item__modal-content"
            footerClass ="cuisine-item__modal-actions"
            footer={<Button onClick={closeRecipeHandler}>CLOSE</Button>}>
                <div className ="recipe-container">
                <ReactPlayer url={props.recipe}/>
                    
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
                {isLoading && <LoadingSpinner asOverlay/>}
                <div className ="cuisine-item__image">
                    <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
                </div>
                <div className ="cuisine-item__info">
                    <h2>{props.title}</h2>
                    <p>{props.ingredients}</p>
                </div>
                <div className="cuisine-item__actions">
                    <Button inverse onClick={openRecipeHandler}>WATCH VIDEO</Button>
                    {auth.chefId === props.creatorId && <Button to={`/cuisines/${props.id}`}>EDIT</Button>}
                    {auth.chefId === props.creatorId && <Button danger onClick = {showDeleteWarningHandler}>DELETE</Button>}
                </div>
                
            </Card>
        </li>
    </React.Fragment>
    )

}

export default CuisineItem;