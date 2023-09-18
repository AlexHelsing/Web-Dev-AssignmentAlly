import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { mutations } from './store/store'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  methods: {
    async getCurrentUser() {
      try {
        console.log('Getting current user')
        const response = await axios.get(
          'http://localhost:3000/api/auth/current-user',
          {
            withCredentials: true
          }
        )
        console.log('Current user:', response.data)

        if (response.data) {
          mutations.setUser(response.data)
        } else {
          mutations.setUser(null)
          this.$router.push('/login')
        }
      } catch (error) {
        console.error('Error fetching current user:', error)
        mutations.setUser(null)
        this.$router.push('/login')
      }
    }
  },
  created() {
    this.getCurrentUser()
  },

  render: function (h) {
    return h(App)
  }
}).$mount('#app')
