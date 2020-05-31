import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import moment from 'moment'
import router from './router'
import store from './store'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library, dom } from '@fortawesome/fontawesome-svg-core'

dom.watch()
library.add(fas)

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.moment = moment


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
