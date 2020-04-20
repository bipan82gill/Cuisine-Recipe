import React, {useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Chef from './Chef/Pages/Chef';
import NewCuisine from './Cuisines/Pages/NewCuisine';
import MainNavigation from './Shared/Components/Navigation/MainNavigation';
import ChefCuisines from './Cuisines/Pages/ChefCuisines';
import UpdateCuisine from './Cuisines/Pages/UpdateCuisine'; 
import Auth from './Chef/Pages/Auth';
import { AuthContext} from './Shared/Context/Auth-context';
import './App.css';

let logoutTimer;
const  App = () => {
  const [ token , setToken ] = useState(false);
  const [ chefId, setChefId ]= useState(false);
  const [ tokenExpirationDate, setTokenExpirationDate ] = useState();
  
    const login = useCallback((chefid, token, expirationDate )=>{
    setToken(token);
    setChefId(chefid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'chefData', 
       JSON.stringify({
         chefId: chefid, 
         token:token,
         expiration: tokenExpirationDate.toISOString()
        }))
   
  },[]);

  const logout = useCallback(()=>{
    setToken(null);
    setChefId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('chefData');
  },[ ]);

  useEffect(() => {
    if(token, tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    logoutTimer = setTimeout(logout, remainingTime);
    }else {
      clearTimeout(logoutTimer);
    }
  },[token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('chefData'));
    if(storedData && 
      storedData.token &&
      new Date(storedData.expiration) > new Date())
      {
      login( storedData.chefid, storedData.token)
    }
  },[login]);

  let routes;

  if(token){
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
     value ={{ isLoggedIn: !!token,
      token:token, 
     chefId: chefId, 
     login: login, 
     logout: logout}}>
    <Router>
    <MainNavigation />
    <main>{routes}</main>
    </Router>
    </AuthContext.Provider>
  ) 
}

export default App;
