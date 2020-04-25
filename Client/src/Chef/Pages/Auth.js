import React, { useState, useContext } from 'react';

import Card from '../../Shared/Components/UIElement/Card';
import Input from '../../Shared/Components/UIElement/FormComponents/Input';
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import { useForm } from  '../../Shared/Hooks/form-hook';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from '../../Shared/Util/validators';
import { AuthContext } from '../../Shared/Context/Auth-context';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import ImageUpload from '../../Shared/Components/UIElement/FormComponents/ImageUpload';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            name:undefined,
            image:undefined
        }, 
        formState.inputs.email.isValid && formState.inputs.password.isValid);
    }else{
        setFormData({
            ...formState.inputs,
            name:{
                value:'',
                isValid:false
            },
            image:{
              value:null,
              isValid:false
            }
        }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const authSubmitHandler = async event => {
        event.preventDefault();

        console.log(formState.inputs);
    
        if (isLoginMode) {
            
           try{
            const responseData = await sendRequest(
              '/api/chefs/login',
              'POST',
               JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              }),
              {
                'Content-Type': 'application/json'
              }
            );

            auth.login(responseData.chefId,responseData.token);
          }catch(err){}
 
        } else {
          try {
            const formData = new FormData();
                  formData.append('email', formState.inputs.email.value);
                  formData.append('name', formState.inputs.name.value);
                  formData.append('password', formState.inputs.password.value);
                  formData.append('image', formState.inputs.image.value);
            const responseData = await sendRequest(
              '/api/chefs/signup',
              'POST',
              formData            
            )
            auth.login(responseData.chefId,responseData.token);
          } catch (err) {}
        }
      };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
        <Card className = "authentication">
            {isLoading && <LoadingSpinner asOverlay />}
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
              {!isLoginMode && <ImageUpload center id ="image" onInput={inputHandler}/>}
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
        </React.Fragment>
    )
}
export default Auth;