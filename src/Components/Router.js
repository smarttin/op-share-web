import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';

import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({isLoggedIn}) => (isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
