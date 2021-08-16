import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Register from './Register';
import Login from './Login';
import Sheet from './Sheet';
import NewSheet from './NewSheet';
import EditSheet from './EditSheet';
import Settings from './Settings';
import AllSheets from './AllSheets';
import NewCategory from './NewCategory';
import Category from './Category';
import requireAuth from '../wrappers/RequireAuth';
import semiAuth from '../wrappers/SemiAuth';
import redirectLoggedIn from '../wrappers/RedirectLoggedIn';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/register" component={redirectLoggedIn(Register)} />
        <Route exact path="/login" component={redirectLoggedIn(Login)} />
        <Route exact path="/settings" component={requireAuth(Settings)} />
        <Route exact path="/:userId/sheet/:sheetTitle" component={semiAuth(Sheet)} />
        <Route exact path="/:userId/sheet/edit/:sheetTitle" component={requireAuth(EditSheet)} />
        <Route exact path="/sheet/new" component={requireAuth(NewSheet)} />
        <Route exact path="/sheet/all" component={AllSheets} />
        <Route exact path="/category/new" component={requireAuth(NewCategory)} />
        {/* <Route exact path="/category" component={Category} /> */}
        <Route exact path="/:userId/category/:categoryTitle" component={semiAuth(Category)} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
