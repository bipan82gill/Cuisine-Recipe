import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Chef from './Chef/Pages/Chef';
import NewCuisine from './Cuisines/Pages/NewCuisine';
import MainNavigation from './Shared/Components/Navigation/MainNavigation';
import ChefCuisines from './Cuisines/Pages/ChefCuisines';
import UpdateCuisine from './Cuisines/Pages/UpdateCuisine'; 
import './App.css';

const  App = () => {
  return(
    <Router>
    <MainNavigation />
    <main>
    <Switch>
    <Route path="/" exact>
    <Chef />
    </Route>
    <Route path="/:chefId/cuisines" exact>
    <ChefCuisines />
    </Route>
    <Route path ="/add/recipe" exact>
    <NewCuisine />
    </Route>
    <Route path ="/cuisines/:cuisineId">
    <UpdateCuisine />
    </Route>
    <Redirect to="/" />
    </Switch>
    </main>
    </Router>
  ) 
}

export default App;
