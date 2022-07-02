import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App';
import api from './api/index'
import router from './router'
import x5GMaps from 'x5-gmaps'

Vue.prototype.$api = api
Vue.use(x5GMaps, { key: '', libraries: ['visualization'] })

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
