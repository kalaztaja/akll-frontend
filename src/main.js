import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import { checkTokensOnRequest } from './util/utils';

import messages from '../localization/messages.js';
import { env } from '../env';

Vue.config.productionTip = false;

Vue.use(VueI18n);

router.beforeEach((to, from, next) => {
  store.dispatch('startLoading');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login-view'
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'post-view'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

document.title =
  env.game === 'csgo'
    ? 'Akateeminen kynäriliiga'
    : 'Akateeminen legendojenliiga';

router.afterEach(() => {
  store.dispatch('stopLoading');
});

axios.interceptors.request.use(checkTokensOnRequest, error => {
  return Promise.reject(error);
});
const matchAxios = axios.create({
  baseURL: 'http://localhost:3002/akll-match'
});
matchAxios.interceptors.request.use(checkTokensOnRequest, error => {
  return Promise.reject(error);
});

const i18n = new VueI18n({
  locale: window.localStorage.language || 'en',
  fallbackLocale: 'en',
  messages
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

export { matchAxios };
