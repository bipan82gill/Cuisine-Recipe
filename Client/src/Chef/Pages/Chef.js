import React, { useEffect, useState } from 'react';

import ChefList from '../Components/ChefList';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';

const Chef =() => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedChefs, setLoadedChefs] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);

            try{
                const response = await fetch('http://localhost:5000/api/chefs');
                const responseData = await response.json();
                
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                setLoadedChefs(responseData.chefs);
                setIsLoading(false);
            }catch(err){
                setIsLoading(false);
                setError(err.message);
            }            
        };
        sendRequest();
    }, []);

    const errorHandler =() => {
        setError(null);
    }
    return(
        <React.Fragment>
        <ErrorModal error={error} onClear ={errorHandler}/>
        {isLoading && (
            <div className ="center">
                <LoadingSpinner />
            </div>
            )}
        {!isLoading && loadedChefs && <ChefList items={loadedChefs}/>}
        </React.Fragment>
    )
}
export default Chef;