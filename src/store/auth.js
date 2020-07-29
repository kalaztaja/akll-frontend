import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

const authStore = {
  state: {
    token: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
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
    }
  },
  mutations: {
    setTokens(state, tokens) {
      state.token = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    },
    clearSession(state) {
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  actions: {
    async formRegister(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/user/create/', {
            username: data.username,
            password: data.password,
            email: data.emailAddress,
            gameInfo: {
              riotUsername: data.username
            }
          })
          .then(response => {
            context.commit('setTokens', response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
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

    async startSteamLinking() {
      // needs work
      // const res = await axios.get(`/user/link/steam`);
    }
  }
};

export default authStore;
