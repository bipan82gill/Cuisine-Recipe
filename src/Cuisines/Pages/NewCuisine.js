import React, { useCallback, useReducer } from 'react';

import Input from "../../Shared/Components/UIElement/FormComponents/Input";
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/Util/validators';
import './NewCuisine.css';

const formReducer =(state, action)=>{
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
            }
        }
        return{
            ...state,
            inputs:{
                [action.inputId]: { value: action.value, isValid:action.isValid }
            },
            isValid: formIsValid
        }

        default:
        return state;
    }
}

const NewCuisine = () => {
  const [ formState,dispatch ] =  useReducer(formReducer, {
        inputs:{
            title:{
                value:"",
                isValid: false
            },
            recipe:{ 
                value:"",
                isValid: false
            }
        },
        isValid: false
    });
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
                type:'INPUT_CHANGE', 
                value: value, isValid: 
                isValid, inputId: id 
            })
    }, []);
   
    return(
        <form className ="cuisine-form">
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
            <Button type="submit" disabled ={!formState.isValid}> ADD RECIPE</Button>       
        </form>
    )   
}

export default NewCuisine;