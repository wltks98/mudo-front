import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import router from './router'
import VueKakaoSdk from 'vue-kakao-sdk'

axios.defaults.baseURL = process.env.VUE_APP_BACK_URL;
Vue.config.productionTip = false
Vue.prototype.$axios=axios

Vue.use(VueKakaoSdk, { apiKey:process.env.VUE_APP_SDK })

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
