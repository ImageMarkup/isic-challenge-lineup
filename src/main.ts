import Vue from 'vue';
import 'reflect-metadata';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App, {
    props: {
      baseUrl: 'https://challenge.isic-archive.com/api/leaderboard/52'
    }
  }),
}).$mount('#app');
