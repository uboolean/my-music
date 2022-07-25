import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'


Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  vuetify,
  render: h => h(App),
  router:router,
  beforeCreate(){
       Vue.prototype.$bus = this //安装全局事件总线
   },
}).$mount('#app')
