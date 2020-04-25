import React, { useEffect, useState } from 'react';

import { useHttpClient } from '../../Shared/Hooks/http-hook';
import ChefList from '../Components/ChefList';
import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';

const Chef =() => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedChefs, setLoadedChefs] = useState();

    useEffect(() => {
        const fetchChefs = async () => {
           
            try{
                const responseData = await sendRequest('/api/chefs');
                      
                setLoadedChefs(responseData.chefs);
            }catch(err){}            
        };
        fetchChefs();
    }, [sendRequest]);
    return(
        <React.Fragment>
        <ErrorModal error={error} onClear ={clearError}/>
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