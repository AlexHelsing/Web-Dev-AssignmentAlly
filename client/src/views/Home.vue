<template>
  <div>
    <div v-if="user">
      <h1>Dashboard</h1>
      <p>Welcome, {{ user.username }}</p>
      <form action="http://localhost:3000/api/auth/logout" method="post">
        <button type="submit" class="btn_message">Logout</button>
      </form>
    </div>
  </div>
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

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
