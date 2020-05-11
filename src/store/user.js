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
      const res = axios.get('/user/all');
      context.commit('setAllUsersArray', res.data);
      return res.data;
    },
    getUserInfo(context, username) {
      const res = axios.get('/username/' + username);
      return res.data;
    }
  }
};

export default userStore;
