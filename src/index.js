import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {ApolloProvider} from '@apollo/client';
import Client from './Apollo/Client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
