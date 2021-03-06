import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueCarousel from 'vue-carousel';
require('./assets/styles/main.css');

Vue.config.productionTip = false
Vue.use(VueCarousel)
Vue.prototype.$showMarker = 0
Vue.prototype.$map = Vue.observable({
  loaded: false
})
Vue.prototype.$language = Vue.observable({
  chosen: "en"
})
export const eventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
