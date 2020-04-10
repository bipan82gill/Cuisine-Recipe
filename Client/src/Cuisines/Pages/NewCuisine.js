import React from 'react';

import Input from "../../Shared/Components/UIElement/FormComponents/Input";
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/Util/validators';
import { useForm} from '../../Shared/Hooks/form-hook';
import './NewCuisine.css';


const NewCuisine = () => {
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
            url_video:{
                value:'',
                isValid:false
            }
        },false
    )

    const recipeSubmitHandler = event =>{ 
        event.preventDefault();
        console.log(formState.inputs);
    }
   
    return(
        <form className ="cuisine-form" onSubmit ={recipeSubmitHandler}>
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
                id ="url_video"
                element = "input" 
                label ="Video URL" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid url of video"
                onInput={inputHandler}
            />
            <Button type="submit" disabled ={!formState.isValid}> ADD RECIPE</Button>       
        </form>
    );  
}

export default NewCuisine;