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
  const { token, refreshToken } = store.state.auth;

  if (!token || !refreshToken) {
    return config;
  }

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
    return 'You have to login';
  }
  const { fullUserInfo } = store.state.auth;

  if (!fullUserInfo) return '';

  if (!fullUserInfo.registrationComplete) {
    return 'You have to finish your account';
  } else if (!fullUserInfo.emailConfirmed) {
    return 'You have to verify your email';
  } else if (env.game === 'csgo' && !fullUserInfo.steam) {
    return 'You have to link your steam';
  }
  return '';
};
