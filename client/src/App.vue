<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <h1>Sign in</h1>
    <form action="http://localhost:3000/api/auth/login/password" method="post">
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
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
