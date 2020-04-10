import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from "../../Shared/Components/UIElement/FormComponents/Input";
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import Card from '../../Shared/Components/UIElement/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/Util/validators';
import { useForm } from '../../Shared/Hooks/form-hook';
import './NewCuisine.css';

const Cuisines=[{
        id:"CU1",
        title:"Gulab Jamun",
        image:"https://baliindiancuisine.com/wp-content/uploads/2015/11/Sanjeev-Kapoor-indian-recipe-of-gulab-jamun-452x262.jpg",
        recipe:"fjhdjfhejf jehfueirhf hejhferhguerd",
        url_vedio:"http://www.google.com",
        creator:"C1"
    }]

const UpdateCuisine = () =>{
    const [isLoading, setIsLoading] = useState(true);
    
    const cuisineId = useParams().cuisineId;

    const [formState, inputHandler, setFormData] = useForm({
        title:{
            value: '',
            isValid:false
        },
        recipe:{
            value: '',
            isValid:false
         }
        // url_vedio:{
        //     value: identifiedCuisine.url_vedio,
        //     isValid:true
        // }
    }, false);

    const identifiedCuisine =Cuisines.find(cuisine => cuisine.id === cuisineId);

    useEffect(()=>{
        if(identifiedCuisine){
            setFormData({
                title:{
                    value: identifiedCuisine.title,
                    isValid: true
                },
                recipe:{
                    value: identifiedCuisine.recipe,
                    isValid:true
                 }
            },true);
        }
        
        setIsLoading(false);
    },[setFormData, identifiedCuisine])
    
    const cuisineUpdateSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs)
    };
    if(!identifiedCuisine){
        return(
            <div className ="center">
                <Card>
                <h2>Could not find recipe !</h2>
                </Card>
            </div>
        )
    }

    if(isLoading){
        return(
            <div className ="center">
            <h2>Loading...</h2>
            </div>
        )
    }
    
    return (
    <form className ="cuisine-form" onSubmit ={cuisineUpdateSubmitHandler}>
    <Input
        id ="title" 
        element ="input"
        type ="text" 
        label ="Title" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter valid text"
        onInput={inputHandler}
        initialValue ={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
    />

    <Input 
        id ="recipe"
        element = "textarea" 
        label ="Recipe" 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="Please enter a valid recipe(atleast 5 characters)"
        onInput={inputHandler}
        initialValue ={formState.inputs.recipe.value}
        initialValid={formState.inputs.recipe.isValid}
    />  

    {/* <Input 
        id ="url_video"
        element = "input" 
        label ="Video URL" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter a valid url of video"
        onInput={inputHandler}
        initialValue ={formState.inputs.url_video.value}
        initialValid={formState.inputs.url_video.isValid}
    /> */}
    <Button type="submit" disabled={!formState.isValid}>UPDATE RECIPE</Button>       
</form>
    )
}
export default UpdateCuisine;