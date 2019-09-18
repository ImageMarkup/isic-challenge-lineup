import Vue from 'vue';
import 'reflect-metadata';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App, {
    baseUrl:
  }),
}).$mount('#app');
