import jwt_decode from 'jwt-decode';
import moment from 'moment';

import store from '../store';

export const isTokenValid = token => {
  const tokenData = jwt_decode(token);
  const expDate = moment.unix(tokenData.exp);
  return moment().isBefore(expDate);
};

export const checkTokensOnRequest = config => {
  if (!store.getters.loggedIn) {
    return config;
  }
  const { token, refreshToken } = store.state.auth;
  
  if (token && isTokenValid(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (refreshToken && isTokenValid(refreshToken)) {
    console.log('using refreshToken!');
    config.headers.Authorization = `Bearer ${refreshToken}`;
  } else {
    store.commit('clearSession');
  }
  return config;
}
