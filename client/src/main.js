import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import { mutations } from './stores/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  // created() {
  //   this.getCurrentUser()
  // },
  methods: {
    async getCurrentUser() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/auth/current-user'
        )
        if (response.data.user) {
          mutations.setUser(response.data.user)
        } else {
          mutations.setUser(null)
          this.$router.push('/login')
        }
      } catch (error) {
        console.error('Error fetching current user:', error)
        mutations.setUser(null)
      }
    }
  },
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
