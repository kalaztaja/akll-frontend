import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

if (localStorage.getItem('accessToken')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
}

const userStore = {
  state: {
    allUsersArray: []
  },
  getters: {
    
  },
  mutations: {},
  actions: {
    async getAllUsers() {
      return new Promise((resolve, reject) => {
        axios
          .get('/user/all')
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
