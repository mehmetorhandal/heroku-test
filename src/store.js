import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import utils from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    refresh_token: localStorage.getItem('refresh_token') || '',
    user: {}
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, refresh_token, user) {
      state.status = 'success';
      state.token = token;
      state.refresh_token = refresh_token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.refresh_token = '';
    }
  },
  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: utils.apiBaseUrl + 'authentication/register', data: user, method: 'POST' })
          .then((resp) => {
            const token = resp.data.data.accessToken;
            const refresh_token = resp.data.data.refreshToken;
            const user = resp.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', refresh_token);

            axios.defaults.headers.common.Authorization = token;
            commit('auth_success', token, refresh_token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: utils.apiBaseUrl + 'authentication/login', data: user, method: 'POST' })
          .then((resp) => {

            const token = resp.data.data.accessToken;
            const refresh_token = resp.data.data.refreshToken;
            const user = resp.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('refresh_token', refresh_token);

            axios.defaults.headers.common.Authorization = token;
            commit('auth_success', token, refresh_token, user);
            resolve(resp);
            window.location.href = '/';
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
  },
});
