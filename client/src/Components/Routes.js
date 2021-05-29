import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import FrontPage from './FrontPage/FrontPage';
import Login from './Login/Login';
import history from './History';
import SignUp from './SignUp/SignUp';
import Documents from './Documents/Documents';
import Profile from './Profile/Profile';

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={FrontPage} />
        <Route path='/Login' component={Login} />
        <Route path='/SignUp' component={SignUp} />
        <Route path='/Documents' component={Documents} />
        <Route path='/Profile' component={Profile} />
      </Switch>
    </Router>
  );
}

export default Routes;
