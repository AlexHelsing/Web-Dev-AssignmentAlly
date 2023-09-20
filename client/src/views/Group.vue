<template>
  <main>
    <header class="header">
      <h1>{{ course }}</h1>
      <b-avatar-group class="member-container">
        <b-avatar></b-avatar>
        <b-avatar></b-avatar>
        <b-avatar></b-avatar>
        <button class="invite-button">Invite member</button>
      </b-avatar-group>
    </header>

    <div class="task-resource-container">
      <section class="left">
        <h1>Tasks</h1>
        <div class="task-list">
          <Task task-code="1" task-description="Task 1" task-label="URGENT" task-date="3 AUG" />
          <Task task-code="2" task-description="Task 2" task-label="CHILL" task-date="3 AUG" />
        </div>
      </section>
      <section class="right">X</section>
    </div>
  </main>
</template>

<script>
import Task from '../components/Task.vue'

export default {
  components: {
    Task
  },
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
  background-color: #e0e1dd;
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

.task-resource-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: aliceblue;
}

.left {
  width: 50%;
  background-color: #1b263b;
  padding: 20px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* This creates space between tasks. */
}

.task-item {
  background-color: #0d1319;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
  /* Prepare for hover effect. */
}

.task-item:hover {
  background-color: #070808;
  /* Slightly darker background on hover. */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  /* Subtle shadow for depth. */

  /* Light border on hover. */
}

.right {
  width: 50%;
  height: 300px;
  background-color: #434249;
}
</style>
