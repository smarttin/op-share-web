import {makeVar} from '@apollo/client';

export const isLoggedIn = makeVar(Boolean(localStorage.getItem('token')) || false);

export const logUserIn = (token) => {
  localStorage.setItem('token', token);
  isLoggedIn(token);
  return null;
};

export const logOutUser = () => {
  localStorage.removeItem('token');
  isLoggedIn(null);
  return null;
};
