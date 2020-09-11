import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

const authStore = {
  state: {
    token: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    linked: true,
    fullUserInfo: null
  },
  getters: {
    userInfo: state => {
      if (state.token) {
        return jwt_decode(state.token);
      }
      return {};
    },
    loggedIn: state => {
      if (state.token) {
        const tokenData = jwt_decode(state.refreshToken);
        const expDate = moment.unix(tokenData.exp);
        return moment().isBefore(expDate);
      }
      return false;
    },
    isTokenValid: state => {
      if (state.token) {
        const tokenData = jwt_decode(state.token);
        const expDate = moment.unix(tokenData.exp);
        return moment().isBefore(expDate);
      }
      return false;
    },
    isSteamLinked: state => {
      if (state.fullUserInfo) {
        return !!state.fullUserInfo.steam;
      }
      return false;
    }
  },
  mutations: {
    setTokens(state, tokens) {
      state.token = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      state.linked = tokens.linked;
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    },
    clearSession(state) {
      state.token = null;
      state.refreshToken = null;
      state.linked = true;
      state.fullUserInfo = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setFullUserInfo(state, userInfo) {
      state.fullUserInfo = userInfo;
    }
  },
  actions: {
    async formRegister(context, data) {
      const res = await axios.post('/user/create/', data);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data.message);
      } else {
        context.commit('setTokens', res.data);
      }
    },

    async login(context, credentials) {
      const res = await axios.post('/integration/login', credentials);
      if (res.status === 200) {
        context.commit('setTokens', res.data);
      } else {
        throw new Error('invalidCredentials');
      }
    },

    async verifyEmail(context, token) {
      const res = await axios.get(`/user/confirm?token=${token}`);
      if (res.status !== 200) {
        throw new Error('invalidToken');
      }
    },

    async resendVerificationEmail(context) {
      const res = await axios.post(
        `/user/${context.getters.userInfo._id}/send-verification`
      );
      if (res.status !== 200) {
        throw new Error('verificationSendError');
      }
    },

    async getFullUserInfo(context) {
      if (!context.getters.loggedIn) return;
      const res = await axios.get(`/user/id/${context.getters.userInfo._id}`);
      context.commit('setFullUserInfo', res.data);
    },

    async getSteamLink() {
      const res = await axios.get('/integration/steam/login');
      return res.data;
    },

    async finalizeSteamLogin(context, params) {
      const res = await axios.get(`/integration/steam/login/verify${params}`);
      if (res.status !== 200) {
        throw new Error('Login failed');
      }
    },

    async sendPasswordReset(context, data) {
      const res = await axios.post('/user/send-reset-password', data);
      if (res.status === 404) {
        throw new Error('UserNotFound');
      }
    },

    async resetPassword(context, data) {
      const res = await axios.post('/user/reset-password', data);
      if (res.status !== 200) {
        throw new Error('Error');
      }
    }
  }
};

export default authStore;
