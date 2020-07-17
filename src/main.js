import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import '../node_modules/primevue/resources/themes/saga-blue/theme.css'
import '../node_modules/primevue/resources/primevue.min.css'
import '../node_modules/primeicons/primeicons.css'
import Vuelidate from 'vuelidate'
import ToastService from 'primevue/toastservice';

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(ToastService)
const api_base_url = "http://emphasoft-test-assignment.herokuapp.com/api/v1"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
