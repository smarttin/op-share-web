import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {HashRouter as Router} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import AppRouter from './Router';
import Footer from "./Footer";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  const {
    data: {isLoggedIn},
  } = useQuery(IS_LOGGED_IN);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <AppRouter isLoggedIn={isLoggedIn} />
          <Footer />
        </Wrapper>
      </Router>
      <ToastContainer position="bottom-left" />
    </ThemeProvider>
  );
};

export default App;
