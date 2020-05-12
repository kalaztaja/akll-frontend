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
  mutations: {
    setAllUsersArray(state, array) {
      state.allUsersArray = array;
    }
  },
  actions: {
    async getAllUsers(context) {
      const res = await axios.get('/user/all');
      context.commit('setAllUsersArray', res.data);
      return res.data;
    },
    async getUserInfo(context, username) {
      const res = await axios.get('/username/' + username);
      return res.data;
    }
  }
};

export default userStore;
