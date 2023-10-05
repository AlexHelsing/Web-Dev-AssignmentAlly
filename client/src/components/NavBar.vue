<template>
  <b-navbar class="custom-navbar" toggleable="md">

    <b-navbar-brand class="navbar-dark navbar-logo-text" to="/dashboard">
      <!-- logo here  -->
      <span class="navbar-logo"></span>
      AssignmentAlly
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" class="hamburger"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="test" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="disabled" to="/meetings">Meetings</b-nav-item>
        <b-nav-item class="disabled" to="/tasks">Tasks</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <b-navbar-nav class="ml-auto">
      <b-dropdown variant="secondary" right class="dropdownmenu">
        <template #button-content>{{ user ? user.username : "..." }}</template>
        <b-dropdown-item-button v-on:click="logout">Logout</b-dropdown-item-button>
      </b-dropdown>
    </b-navbar-nav>

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

.hamburger {
  background-color: #ffffff;
}

/* Style for the links */
.custom-navbar .nav-item a.nav-link {
  color: #e5e5e5;
  transition: color 0.2s;
}

.custom-navbar a {
  color: #ffffff;
  text-decoration: none;
}

/* Hover effect for the links */
.custom-navbar .nav-item a.nav-link:hover {
  color: #ffffff;
  text-decoration: none;
  transform: scale(1.05);
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

.disabled {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
}

.navbar-logo-text {
  color: #ffffff !important;
}

.navbar-logo {
  color: #ffffff !important;
  margin-right: 8px;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}
</style>
