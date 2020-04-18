import React, { useState, useContext } from 'react';

import Card from '../../Shared/Components/UIElement/Card';
import Input from '../../Shared/Components/UIElement/FormComponents/Input';
import Button from '../../Shared/Components/UIElement/FormComponents/Button';
import { useForm } from  '../../Shared/Hooks/form-hook';
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from '../../Shared/Util/validators';
import { AuthContext } from '../../Shared/Context/Auth-context';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import ImageUpload from '../../Shared/Components/UIElement/FormComponents/ImageUpload';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode,setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
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
    // const authSubmitHandler = async event =>{
    //     event.preventDefault();

    //     if(isLoginMode){

    //     }else{
    //         try{
    //             const response = await fetch('http://localhost:5000/api/chefs/signup',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     name: formState.inputs.name.value,
    //                     email: formState.inputs.email.value,
    //                     password: formState.inputs.password.value
    //                 })
    //             });
    //             const data = await response.json();
    //             console.log(data);
    //         }catch(err)
    //         {
    //             console.log(err);
    //         }
       
    // }
    //     auth.login();
    // }

    const authSubmitHandler = async event => {
        event.preventDefault();
       
        setIsLoading(true);
    
        if (isLoginMode) {
          try {
            const formData = new FormData();
            formData.append('email', formState.inputs.email.value);
            formData.append('name', formState.inputs.name.value);
            formData.append('password', formState.inputs.password.value);
            formData.append('image', formState.inputs.image.value);
            const response = await fetch('http://localhost:5000/api/chefs/login', {
              method: 'POST',
              formData,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              })
            });
    
            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            setIsLoading(false);
            auth.login();
          } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Something went wrong, please try again.');
          }
        } else {
          try {
            const response = await fetch('http://localhost:5000/api/chefs/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              })
            });
    
            const responseData = await response.json();
            console.log(response);
      
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            setIsLoading(false);
            auth.login();
          } catch (err) {
            setIsLoading(false);
            console.log(err, err.message);
            setError(err.message || 'Something went wrong, please try again.');
          }
        }
      };
      const errorHandler = () => {
        setError(null);
      };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
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