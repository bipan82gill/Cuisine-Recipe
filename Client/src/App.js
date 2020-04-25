import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

// import Chef from './Chef/Pages/Chef';
// import NewCuisine from './Cuisines/Pages/NewCuisine';
import MainNavigation from './Shared/Components/Navigation/MainNavigation';
// import ChefCuisines from './Cuisines/Pages/ChefCuisines';
// import UpdateCuisine from './Cuisines/Pages/UpdateCuisine'; 
// import Auth from './Chef/Pages/Auth';
import { AuthContext} from './Shared/Context/Auth-context';
import { useAuth } from './Shared/Hooks/auth-hook';
import './App.css';
import LoadingSpinner from './Shared/Components/UIElement/LoadingSpinner';

const Chef = React.lazy(()=> import('./Chef/Pages/Chef'));
const NewCuisine = React.lazy(()=> import('./Cuisines/Pages/NewCuisine'));
const ChefCuisines = React.lazy(()=> import('./Cuisines/Pages/ChefCuisines'));
const UpdateCuisine = React.lazy(()=> import('./Cuisines/Pages/UpdateCuisine'));
const Auth = React.lazy(()=> import('./Chef/Pages/Auth'));

const  App = () => {
  const { login, logout, token, chefId } = useAuth();
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
    <main><Suspense fallback ={<div className="center"><LoadingSpinner/></div>}>{routes}</Suspense></main>
    </Router>
    </AuthContext.Provider>
  ) 
}

export default App;
