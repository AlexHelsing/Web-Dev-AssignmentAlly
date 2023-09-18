<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <h1>Sign in</h1>
    <form @submit.prevent="handleSubmit">
      <section>
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" autocomplete="username" required autofocus>
      </section>
      <section>
        <label for="current-password">Password</label>
        <input v-model="password" id="current-password" type="password" autocomplete="current-password" required>
      </section>
      <button type="submit">Sign in</button>
    </form>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password
        })

        if (response.data.success) {
          this.$router.push('/dashboard')
        } else {
          alert(response.data.message || 'Login failed')
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
