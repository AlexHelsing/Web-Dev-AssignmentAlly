<template>
  <b-navbar type="light" class="custom-navbar">
    <b-navbar-brand variant="dark" type="primary" to="/">LOGO</b-navbar-brand>

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
  </b-navbar>
</template>

<script>
import { store } from '../store/store'
export default {
  computed: {
    user() {
      return store.user
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
