import React from 'react';

import Input from "../../Shared/Components/UIElement/FormComponents/Input";
import {VALIDATOR_REQUIRE} from '../../Shared/Util/validators';
import './NewCuisine.css';

const NewCuisine = () => {
    return(
        <form className ="cuisine-form">
            <Input element = "input" 
            type ="text" 
            label ="Title" 
            validators={[VALIDATOR_REQUIRE()]} errorText="Please enter valid text"/>
        </form>
    )   
}

export default NewCuisine;