import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { env } from '../../env';

import userStore from './user';
import postStore from './post';
import teamStore from './team';
import seasonStore from './season';
import authStore from './auth';

Vue.use(Vuex);
axios.defaults.baseURL = env.backendUrl;

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    retrieveUserInfo(context) {
      if (context.state.token !== null) {
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + context.state.token;
          axios
            .get('/user/')
            .then(response => {
              context.commit('retrieveUserInfo', response.data);
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    },
    retrieveAllUsers(context) {
      if (context.state.token !== null) {
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + context.state.token;
          axios
            .get('/users/')
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    },
    
    registerTeam(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/teams/', {
            team_name: data.team_name,
            tag: data.tag
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    retrieveAllPlayers() {
      return new Promise((resolve, reject) => {
        axios
          .get('/players/')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {
    user: userStore,
    post: postStore,
    team: teamStore,
    season: seasonStore,
    auth: authStore
  }
});
