import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';

const Routes = () => {
  return (
    <Switch>
    <Route path="/" component={Home} />

    <Route path="/**">
      <Redirect to="/" />
    </Route>
  </Switch>
  );
};

export default Routes;