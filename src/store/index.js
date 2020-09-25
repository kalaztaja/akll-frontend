import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { env } from '../../env';

import userStore from './user';
import postStore from './post';
import teamStore from './team';
import seasonStore from './season';
import authStore from './auth';
import alertStore from './alert';
import matchStore from './match';

Vue.use(Vuex);
axios.defaults.baseURL = env.backendUrl;

export default new Vuex.Store({
  state: {},
  actions: {},
  modules: {
    user: userStore,
    post: postStore,
    team: teamStore,
    season: seasonStore,
    auth: authStore,
    alert: alertStore,
    match: matchStore
  }
});
