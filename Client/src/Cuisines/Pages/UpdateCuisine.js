import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from "../../Shared/Components/UIElement/FormComponents/Input";
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import Card from '../../Shared/Components/UIElement/Card';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/Util/validators';
import { useForm } from '../../Shared/Hooks/form-hook';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import { AuthContext } from '../../Shared/Context/Auth-context';
import './NewCuisine.css';



const UpdateCuisine = () =>{
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedCuisine, setLoadedCuisine ] = useState();
    
    const cuisineId = useParams().cuisineId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title:{
            value: '',
            isValid:false
        },
        ingredients:{
            value: '',
            isValid:false
         }
        
    }, false);

    useEffect(()=>{
     try{
        const fetchCuisine = async() => {
        const responseData = await sendRequest(`http://localhost:5000/api/cuisines/${cuisineId}`);
        
        setLoadedCuisine(responseData.cuisine);
        setFormData({
            title:{
                value: responseData.cuisine.title,
                isValid: true
            },
            ingredients:{
                value: responseData.cuisine.ingredients,
                isValid:true
             }
        },true);
        };
        fetchCuisine();
     }catch(err){}
     
   

    }, [ sendRequest, cuisineId, setFormData ]);

    const cuisineUpdateSubmitHandler = async event =>{
        event.preventDefault();
       try{
        await sendRequest(`
        http://localhost:5000/api/cuisines/${cuisineId}`,
        'PATCH',
        JSON.stringify({
            title: formState.inputs.title.value,
            ingredients: formState.inputs.ingredients.value
        }),
        { 'Content-Type': 'application/json'}

    )
    history.push('/'+ auth.chefId + '/cuisines');
    }catch(err){}
    };

    if(isLoading){
        return(
            <div className ="center">
            <LoadingSpinner />
            </div>
        )
    }

    if(!loadedCuisine && !error ){
        return(
            <div className ="center">
                <Card>
                <h2>Could not find recipe !</h2>
                </Card>
            </div>
        )
    }
    
    return (
    <React.Fragment>
        <ErrorModal error ={error} onClear={clearError}/>
    { !isLoading && loadedCuisine && <form className ="cuisine-form" onSubmit ={cuisineUpdateSubmitHandler}>
    <Input
        id ="title" 
        element ="input"
        type ="text" 
        label ="Title" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter valid text"
        onInput={inputHandler}
        initialValue ={loadedCuisine.title}
        initialValid={true}
    />

    <Input 
        id ="ingredients"
        element = "input" 
        label ="ingredients" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter a valid ingredients"
        onInput={inputHandler}
        initialValue ={loadedCuisine.ingredients}
        initialValid={true}
    />  

    
    <Button type="submit" disabled={!formState.isValid}>UPDATE CUISINE</Button>       
</form>}
</React.Fragment>
    )
}
export default UpdateCuisine;