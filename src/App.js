import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Chef from './Chef/Pages/Chef';
import NewCuisine from './Cuisines/Pages/NewCuisine';
import './App.css';

const  App = () => {
  return(
    <Router>
    <Switch>
    <Route path="/" exact>
    <Chef />
    </Route>
    <Route path ="/cuisine/new" exact>
    <NewCuisine />
    </Route>
    <Redirect to="/" />
    </Switch>
    </Router>
  ) 
}

export default App;
