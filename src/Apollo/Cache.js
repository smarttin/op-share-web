import {makeVar} from '@apollo/client';

export const isLoggedIn = makeVar(Boolean(localStorage.getItem('token')) || false);

export const logUserIn = (_, {token}) => {
  localStorage.setItem('token', token);
  isLoggedIn(token);
  return null;
};

export const logOutUser = (_, __, {cache}) => {
  localStorage.removeItem('token');
  isLoggedIn(null);
  return null;
};
