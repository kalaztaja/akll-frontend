import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import { checkTokensOnRequest } from './util/utils';

import messages from '../localization/messages.js';

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

router.afterEach(() => {
  store.dispatch('stopLoading');
});

axios.interceptors.request.use(checkTokensOnRequest, error => {
  return Promise.reject(error);
});

const i18n = new VueI18n({
  locale: 'en',
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
