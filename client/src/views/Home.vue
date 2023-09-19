<template>
  <!-- <div>
    <ul>
      <li v-for="group in groups" :key="group.id">{{ group.course }}</li>
    </ul>
  </div> -->
  <div class="main">
    <div class="section">
      <h1 class="section-title">Assignment Group</h1>
      <div class="section-content-1">
        <b-card class="group-card" v-for="group in groups" :key="group.id">
          <b-card-text>
            {{ group.course }}
          </b-card-text>
        </b-card>
        <b-card class="create-group-card">
          <b-card-text>
            Create a new group
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/store'
export default {
  data() {
    return {
      groups: []
    }
  },
  methods: {
    async fetchMyGroups() {
      const response = await fetch('http://localhost:3000/api/groups/getMyGroups', {
        credentials: 'include'
      })
      const data = await response.json()
      console.log('data', data)
      this.groups = data
      console.log('groups', this.groups)
    }
  },
  mounted() {
    this.fetchMyGroups()
  },
  computed: {
    user() {
      return store.user
    }
  }
}
</script>

<style>
.main {
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.section {
  color: blueviolet;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.section-title {
  color: white;
  font-size: 2em;
  margin: 0;
}

.group-card {
  background-color: white;
  color: black;
  padding: 10px;
  font-size: larger;
  font-style: italic;
  font-weight:500;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.create-group-card {
  color: black;
  padding: 10px;
  font-size: larger;
  font-size: x-large;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.section-content-1 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding-top: 6px;
  grid-gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
