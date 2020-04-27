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
    async getAllUsers() {
      console.log('here');
      return new Promise((resolve, reject) => {
        console.log('here2');
        axios
          .get('/user/all')
          .then(response => {
            console.log(response);
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
            firstName: data.firstName,
            surname: data.lastName,
            gameInfo: {
              riotUsername: data.username,
              rank: '',
              role: ''
            }
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default userStore;
