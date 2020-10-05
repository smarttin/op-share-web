import React from 'react';
import {ThemeProvider} from 'styled-components';
import {HashRouter as Router} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';

import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import AppRouter from './Router';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn { 
    isLoggedIn @client
  }
`;

const App = () => {
  const {data: {isLoggedIn}} = useQuery(IS_LOGGED_IN);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <AppRouter isLoggedIn={isLoggedIn} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
