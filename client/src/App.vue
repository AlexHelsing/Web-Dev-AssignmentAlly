<template>
  <div id="app">
    <Navbar v-if="this.$route.path !== '/login' && this.$route.path !== '/signup'" />
    <router-view></router-view>
    <EditTaskModal :task="selectedTask" />
  </div>
</template>

<script>
import Navbar from './components/NavBar'
import EditTaskModal from './components/EditTaskModal'

export default {
  name: 'App',
  components: {
    Navbar,
    EditTaskModal
  },
  data() {
    return {
      selectedTask: null
    }
  }
}

</script>

<style>
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

:root {
  background-color: #1b263b;
  --primary-light-hsl: 200, 100%, 91%;
  --primary-hsl: 200, 100%, 50%;
  --primary-dark-hsl: 200, 100%, 6%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
