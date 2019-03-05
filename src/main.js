// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: sessionStorage.token ? 1 : 0
  },
  mutations: {
    tokenFn (state) {
      state.isLogin = 1;
    }
  }
})

/* eslint-disable no-new */
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
