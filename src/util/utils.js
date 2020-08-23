import jwt_decode from 'jwt-decode';
import moment from 'moment';

import store from '../store';
import { env } from '../../env';

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
    // console.log('using refreshToken!');
    config.headers.Authorization = `Bearer ${refreshToken}`;
  } else {
    store.commit('clearSession');
  }
  return config;
};

export const canCreateOrJoinTeam = () => {
  if (!store.getters.loggedIn) {
    return false;
  }
  const { fullUserInfo } = store.state.auth;

  if (!fullUserInfo) return false;

  if (env.game === 'csgo') {
    return (
      fullUserInfo.registrationComplete &&
      fullUserInfo.emailConfirmed &&
      !!fullUserInfo.steam
    );
  }
  return fullUserInfo.registrationComplete && fullUserInfo.emailConfirmed;
};

export const createTeamTooltip = () => {
  if (!store.getters.loggedIn) {
    return 'Sinun pitää kirjautua sisään!';
  }
  const { fullUserInfo } = store.state.auth;

  if (!fullUserInfo) return '';

  if (!fullUserInfo.registrationComplete) {
    return 'Sinun pitää luoda tunnuksesi loppuun!';
  } else if (!fullUserInfo.emailConfirmed) {
    return 'Sinun pitää vahvistaa sähköpostisi!';
  } else if (env.game === 'csgo' && !fullUserInfo.steam) {
    return 'Sinun pitää linkittää Steam-tilisi AKL-tiliisi';
  }
  return '';
};
