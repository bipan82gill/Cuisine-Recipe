import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';


import Input from "../../Shared/Components/UIElement/FormComponents/Input";
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import ImageUpload from '../../Shared/Components/UIElement/FormComponents/ImageUpload';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/Util/validators';
import { useForm} from '../../Shared/Hooks/form-hook';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import { AuthContext } from '../../Shared/Context/Auth-context';
import './NewCuisine.css';


const NewCuisine = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState,inputHandler] = useForm(
        {
            title:{
                value:'',
                isValid:false
            },
            recipe:{
                value:'',
                isValid:false
            },
            ingredients:{
                value:'',
                isValid:false
            },
            image:{
                value:null,
                isValid:false
            }
        },false
    )
    const history = useHistory();

    const recipeSubmitHandler = async event =>{ 
        event.preventDefault();
        try{
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('recipe', formState.inputs.recipe.value);
            formData.append('ingredients', formState.inputs.ingredients.value);
            formData.append('creator', auth.chefId);
            formData.append('image', formState.inputs.image.value);
            await sendRequest(
            'http://localhost:5000/api/cuisines/add/recipe',
            'POST',
            formData
        );
        history.push('/');
        }catch(err){}     
    }
    return(
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <form className ="cuisine-form" onSubmit ={recipeSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
                id ="title" 
                element ="input"
                type ="text" 
                label ="Title" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter valid text"
                onInput={inputHandler}
            />

            <Input 
                id ="recipe"
                element = "textarea" 
                label ="Recipe" 
                validators={[VALIDATOR_MINLENGTH(5)]} 
                errorText="Please enter a valid recipe(atleast 5 characters)"
                onInput={inputHandler}
            />  

            <Input 
                id ="ingredients"
                element = "input" 
                label ="Ingredients" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter ingredients for cuisine"
                onInput={inputHandler}
            />
             <ImageUpload center id ="image" onInput={inputHandler}errorText="Please provide an image"/>
           
            <Button type="submit" disabled ={!formState.isValid}> ADD RECIPE</Button>       
        </form>
        </React.Fragment>
    ) 
}

export default NewCuisine;