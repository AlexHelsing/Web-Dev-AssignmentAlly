<template>
  <b-navbar type="light" class="custom-navbar">
    <b-navbar-brand variant="dark" type="primary" to="/dashboard">LOGO</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="test" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item to="/meetings">Meetings</b-nav-item>
        <b-nav-item to="/tasks">Tasks</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-dropdown variant="secondary" right class="dropdownmenu">
      <template #button-content>{{ user ? user.username : "..." }}</template>
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
        const data = await response.json().then(() => {
          this.$router.push('/login')
        })
        console.log('data', data)
      } catch (error) {
        console.error('Error logging in:', error)
      }
    }

  }
}
</script>

<style scoped>
.custom-navbar {
  background-color: #0d1321;
  color: #ffffff;
}

/* Style for the links */
.custom-navbar .nav-item a.nav-link {
  color: #e5e5e5;
  /* Slightly brighter than the text color */
  transition: color 0.2s;
  /* Smooth transition */
}

.custom-navbar a {
  color: #ffffff;
  text-decoration: none;
}

/* Hover effect for the links */
.custom-navbar .nav-item a.nav-link:hover {
  color: #ffffff;
  text-decoration: none;
  scale: 1.05;
}

/* Style for the active link */
.custom-navbar .nav-item a.nav-link.router-link-active {
  color: #ffffff;
  font-weight: bold;
}

.custom-navbar .navbar-brand:hover {
  color: #ffffff;
  text-decoration: none;

}
</style>
