import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap-scss'
import VueSessionStorage from 'vue-sessionstorage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLocalStorage from 'vue-localstorage'
 
Vue.use(VueLocalStorage)

library.add(faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)




Vue.use(VueSessionStorage)
Vue.use(Vuex)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


