import Vue from 'vue';

import './plugins/vuetify';
import Axios from 'axios';
import store from './store';
import router from './router';
import App from './App.vue';
import VueRouter from 'vue-router';
import Login from '@/components/Auth/Login';
import VeeValidate from "vee-validate";
import utils from './utils';
import vuetify from './plugins/vuetify';

window.utils = utils;
Vue.use(VueRouter, Axios, VeeValidate);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refresh_token');

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common.Authorization = accessToken;
  Vue.prototype.$http.defaults.headers.common.RefreshToken = refreshToken;
}

var apps = App;

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    if(!store.getters.isLoggedIn){
      apps = Login;
    } else {
      window.location.href = '/';
      return;
    }
  }
  if (to.meta.requiresAuth == undefined && to.matched.some(record => !record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    window.location.href = '/login';
  } else {
    next();
  }
});

const bus = new Vue({
  render: h => h(apps),
  router,
  vuetify,
  store
}).$mount('#app');

export default bus;
