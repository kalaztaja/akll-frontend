import axios from 'axios';

const userStore = {
  state: {
    token: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    allUsersArray: []
  },
  mutations: {
    setTokens(state, tokens) {
      state.token = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokens.accessToken}`;
    },
    setAllUsersArray(state, users) {
      this.state.allUsersArray = users;
    }
  },
  getters: {
    getUserArray: state => {
      return state.allUsersArray;
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
    async getAllUsers(context) {
      return new Promise((resolve, reject) => {
        axios
          .get('/user/all')
          .then(response => {
            context.commit('setAllUsersArray', response.data);
            resolve(response.data);
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
    getUserInfo(context, userId) {
      return new Promise((resolve, reject) => {
        axios
          .get('/user/' + userId + '/info')
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default userStore;
