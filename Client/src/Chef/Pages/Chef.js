import React from 'react';
import ChefList from '../Components/ChefList';

const Chef =() => {
    const CHEF =[
        {
        id:'C1',
        name:"Sanjeev",
        image:'data:image/jpeg;base64,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',
        cuisines: 3,

    }]
    return(
        <ChefList items={CHEF}/>
    )
}
export default Chef;