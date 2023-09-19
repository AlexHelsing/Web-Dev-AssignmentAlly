<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand to="/">LOGO</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="test" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item to="/meetings">Meetings</b-nav-item>
        <b-nav-item to="/tasks">Tasks</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <form action="http://localhost:3000/api/auth/logout" method="post">
      <button type="submit" style="font-size: 10px; padding: 2px 6px;">Logout</button>
    </form>
    <b-navbar-nav class="ml-auto">
      <b-nav-item>{{ user ? user.username : "fetching user..." }}</b-nav-item>
    </b-navbar-nav>
    <b-dropdown>
    <template #button-content>{{ user.username }}</template>
    <b-dropdown-item-button v-on:click="logout">Logout</b-dropdown-item-button>
  </b-dropdown>
  </b-navbar>
</template>

<script>
import { store } from '../store/store'

export default {
  computed: {
    user() {
      return store.user
    }
  },
  methods: {
    logout: async function (event) {
      try {
        console.log(this.username, this.password)
        const response = await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        })
        const data = await response.json()
        console.log('data', data)
      } catch (error) {
        console.error('Error logging in:', error)
      }
    }

  }
}
</script>
