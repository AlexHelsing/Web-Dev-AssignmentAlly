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
          <Task task-code="DIT444" task-description="Complete task 4" task-label="URGENT" task-date="3 AUG" />
          <Task task-code="DIT444" task-description="Task 2" task-label="CHILL" task-date="3 AUG" />
          <button class="newTaskButton"> New Task </button>
        </div>
      </section>
      <section class="right">IDK wtf to put on this shit</section>
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

.newTaskButton {
  background-color: #34a8eb;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.newTaskButton:hover {
  background-color: #2c90d4;
  transform: translateY(-2px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.newTaskButton:active {
  transform: translateY(0px);
}

.task-resource-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: aliceblue;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}

.left {
  width: 50%;
  background-color: #1b263b;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right {
  width: 50%;
  height: 300px;
  background-color: #434249;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
}</style>
