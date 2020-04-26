import React, { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/Hooks/http-hook';

import ErrorModal from '../../Shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElement/LoadingSpinner';
import CuisineList from '../Components/CuisineList';



const ChefCuisines =() =>{
    const [ loadedCuisines, setLoadedCuisines ] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const chefId = useParams().chefId;

    useEffect(()=>{
        const fetchCuisines= async() => {
          try{
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/cuisines/chef/${chefId}`);
                setLoadedCuisines(responseData.cuisines);
        }catch(err){}
    }
        fetchCuisines();
    }, [ sendRequest, chefId ]);

    const cuisineDeleteHandler = deletedCuisineId =>{
        setLoadedCuisines(prevCuisines =>
            prevCuisines.filter(cuisine => cuisine.id !== deletedCuisineId)
        );
    }
    return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <div className ="center">
        <LoadingSpinner asOverlay />
    </div>}
    {!isLoading && loadedCuisines && <CuisineList items={loadedCuisines} onDeleteCuisine={cuisineDeleteHandler} />}
    </React.Fragment>
    )
}

export default ChefCuisines;
