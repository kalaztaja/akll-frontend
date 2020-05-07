import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

const authStore = {
  state: {
    token: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  },
  getters: {
    userInfo: (state) => {
      if (state.token) {
        return jwt_decode(state.token);
      }
      return {};
    },
    loggedIn: (state) => {
      if (state.token) {
        const tokenData = jwt_decode(state.refreshToken);
        const expDate = moment.unix(tokenData.exp);
        return moment().isBefore(expDate);
      }
      return false;
    },
    isTokenValid: (state) => {
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
    async registerWithSteam(context, formData) {
      const res = await axios.post('/user/register/complete', formData);
      context.state.commit('setTokens', res.data);
    },
    register(context, formData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/user/create/', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
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
      
    }
  }
};

export default authStore;
