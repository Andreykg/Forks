import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VModal from 'vue-js-modal';
import './assets/css/style.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'sass-loader';

Vue.config.productionTip = false;
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
