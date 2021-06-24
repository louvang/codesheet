import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Register from './Register';
import Login from './Login';
import Sheet from './Sheet';
import Settings from './Settings';
import requireAuth from '../wrappers/RequireAuth';
import redirectLoggedIn from '../wrappers/RedirectLoggedIn';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/register" component={redirectLoggedIn(Register)} />
        <Route exact path="/login" component={redirectLoggedIn(Login)} />
        <Route exact path="/settings" component={requireAuth(Settings)} />
        <Route exact path="/sheet" component={Sheet} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
