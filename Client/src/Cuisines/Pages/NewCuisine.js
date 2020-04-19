import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';


import Input from "../../Shared/Components/UIElement/FormComponents/Input";
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';

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
            }
        },false
    )
    const history = useHistory();

    const recipeSubmitHandler = async event =>{ 
        event.preventDefault();
        try{
            await sendRequest(
            'http://localhost:5000/api/cuisines',
             'POST',
              JSON.stringify({
                title: formState.inputs.title.value,
                recipe: formState.inputs.recipe.value,
                ingredients: formState.inputs.ingredients.value,
                creator: auth.chefId
            }),
            { 'Content-Type': 'application/json' }
        )
        history.push('/');
        console.log(formState.inputs);
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
            <Button type="submit" disabled ={!formState.isValid}> ADD RECIPE</Button>       
        </form>
        </React.Fragment>
    ) 
}

export default NewCuisine;