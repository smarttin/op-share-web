import {ApolloClient, InMemoryCache} from '@apollo/client';
import {isLoggedIn} from './Cache';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedIn();
          },
        },
      },
    },
  },
});

const Client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
});

export default Client;
