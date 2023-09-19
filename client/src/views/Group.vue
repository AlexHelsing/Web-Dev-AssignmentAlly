<template>
    <header class="header">
        <h1>{{ course }}</h1>
      <b-avatar-group class="member-container">
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <b-avatar></b-avatar>
      <button class="invite-button">Invite member</button>
    </b-avatar-group>
    </header>
</template>

<script>
export default {
  data() {
    return {
      groupId: this.$route.params.id,
      course: ''
    }
  },
  methods: {
    async fetchGroup() {
      const response = await fetch(`http://localhost:3000/api/groups/get-course/${this.groupId}`, {
        credentials: 'include'
      })
      const data = await response.json()
      console.log('data', data)
      this.course = data.course
    }
  },
  mounted() {
    this.fetchGroup()
  }
}
</script>

<style>
.header {
    background-color: #ebecec;
    padding: 20px;
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.invite-button {
    background-color: #2c3e50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
}
</style>
