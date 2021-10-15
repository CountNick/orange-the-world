import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueCarousel from 'vue-carousel';
require('./assets/styles/main.css');

Vue.config.productionTip = false
Vue.use(VueCarousel)
Vue.prototype.$showMarker = 0

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
