<template>
    <div>
        <h1>Sign in</h1>
        <form action="http://localhost:3000/api/auth/login/" method="post">
            <section>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" autocomplete="username" required autofocus>
            </section>
            <section>
                <label for="current-password">Password</label>
                <input id="current-password" name="password" type="password" autocomplete="current-password" required>
            </section>
            <button type="submit">Sign in</button>
        </form>
    </div>
</template>

<script>
import { store, mutations } from '../store/store'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    user() {
      console.log('user', store.user)
      return store.user
    }
  },
  methods: {
    async handleSubmit() {
      try {
        console.log(this.username, this.password)
        const response = await fetch('http://localhost:3000/api/auth/login', {
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
        if (data.user) {
          mutations.setUser(data.user)
        } else {
          mutations.setUser(null)
        }
      } catch (error) {
        console.error('Error logging in:', error)
        mutations.setUser(null)
      }
    }
  }
}
</script>
