import Vue from 'vue'
import App from "./App";
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
