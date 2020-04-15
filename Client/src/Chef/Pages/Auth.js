import React, { useState, useContext } from 'react';

import Card from '../../Shared/Components/UIElement/Card';
import Input from '../../Shared/Components/UIElement/FormComponents/Input';
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import { useForm } from  '../../Shared/Hooks/form-hook';
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from '../../Shared/Util/validators';
import { AuthContext } from '../../Shared/Context/Auth-context';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode,setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
       {
            email:{
                value: '',
                isValid: false
            },
            password:{
                value: '',
                isValid: false
            }
       },
    false
    );
    const switchModeHandler = ()=>{
       if(!isLoginMode){
        setFormData(
            {
            ...formState.inputs,
            name:undefined
        }, 
        formState.inputs.email.isValid && formState.inputs.password.isValid);
    }else{
        setFormData({
            ...formState.inputs,
            name:{
                value:'',
                isValid:false
            }
        }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    }
    const authSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }
    return (
        <Card className = "authentication">
            <h1>Login Required</h1>
            <hr />
            <form onSubmit ={authSubmitHandler}>
              {!isLoginMode && (
                  <Input 
                  element ="input"
                  id="name"
                  type="text"
                  label="Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a name"
                  onInput={inputHandler}/>
              )}
                <Input 
                element = "input" 
                id="email" 
                type ="email" 
                label ="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please Enter a valid E-mail"
                onInput={inputHandler}
                />
                <Input 
                element = "input" 
                id="password" 
                type ="password" 
                label ="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please Enter a minimum length of 6 characters"
                onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'LOGIN' :'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                {isLoginMode ? 'SIGNUP':'LOGIN'}
            </Button>
        </Card>
    )
}
export default Auth;