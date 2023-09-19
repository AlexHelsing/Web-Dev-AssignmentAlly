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
