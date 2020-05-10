import axios from 'axios';

if (localStorage.getItem('accessToken')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;
}

const userStore = {
  state: {
    allUsersArray: []
  },
  getters: {},
  mutations: {},
  actions: {
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
