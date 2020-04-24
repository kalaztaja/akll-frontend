import axios from 'axios';

const userStore = {
  state: {
    token: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
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
          .post('/users/', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  }
};

export default userStore;
