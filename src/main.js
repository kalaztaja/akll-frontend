import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import { checkTokensOnRequest } from './util/utils';

Vue.config.productionTip = false;

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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
