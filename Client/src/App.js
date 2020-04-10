import React, {useState, useCallback} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Chef from './Chef/Pages/Chef';
import NewCuisine from './Cuisines/Pages/NewCuisine';
import MainNavigation from './Shared/Components/Navigation/MainNavigation';
import ChefCuisines from './Cuisines/Pages/ChefCuisines';
import UpdateCuisine from './Cuisines/Pages/UpdateCuisine'; 
import Auth from './Chef/Pages/Auth';
import { AuthContext} from './Shared/Context/Auth-context';
import './App.css';

const  App = () => {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  
  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[]);

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[]);

  let routes;

  if(isLoggedIn){
    routes=(
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
        <Redirect to='/' />
      </Switch>
    );
  }else{
    routes = (
      <Switch>
      <Route path="/" exact>
          <Chef />
      </Route>
      <Route path="/:chefId/cuisines" exact>
          <ChefCuisines />
      </Route>
      <Route path ="/auth">
          <Auth />
      </Route>
      <Redirect to='/auth' />
      </Switch>
    )
  }

  return(
    <AuthContext.Provider
     value ={{ isLoggedIn: isLoggedIn, login: login, logout: logout}}>
    <Router>
    <MainNavigation />
    <main>{routes}</main>
    </Router>
    </AuthContext.Provider>
  ) 
}

export default App;
