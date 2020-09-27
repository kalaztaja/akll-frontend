import axios from 'axios';

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
      const res = await axios.get('/user/username/' + username);
      return res.data;
    },
    async getUserInfoById(context, id) {
      const res = await axios.get(`/user/id/${id}`);
      return res.data;
    },
    async startSteamLinking() {
      const res = await axios.get('user/link/steam');
      return res.data;
    },
    async editUserInfo(context, userData) {
      const res = await axios.post(`/user/${userData.id}/update`, userData);
      if (res.status !== 200) {
        throw new Error();
      }
    }
  }
};

export default userStore;
