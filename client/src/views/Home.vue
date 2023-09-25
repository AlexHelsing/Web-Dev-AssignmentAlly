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
        <router-link v-for="group in groups" :key="group.id" :to="'/group/' + group._id" tag="div"
          class="router-link-wrapper">
          <b-card class="group-card">
            <b-card-text>
              {{ group.assignmentGroupName }}
            </b-card-text>
          </b-card>
        </router-link>
        <b-button v-b-modal.modal-1>Create New Group</b-button>
      </div>
      <b-modal id="modal-1" title="Create an assignment group" centered>
        <div class="mb-3">
          <label for="assignment-group-name" class="form-label">assignmentGroupName</label>
          <input type="text" id="assignment-group-name" class="form-control" v-model="assignmentGroupName"
            placeholder="Enter assignmentGroupName">
        </div>
        <div class="mb-3">
          <label for="course" class="form-label">CourseCode</label>
          <input type="text" id="course" class="form-control" v-model="course" placeholder="Enter course name">
        </div>
        <div slot="modal-footer" class="w-100 d-flex justify-content-end">
          <b-button variant="primary" @click="createGroup">Create</b-button>
        </div>
      </b-modal>
    </div>

    <div class="section">
      <h1 class="section-title">My Tasks</h1>
      <div class="section-content-tasks">
        <Task v-for="task in tasks" :key="task._id" :task-name="task.TaskName" :task-description="task.Description"
          :task-assignee="task.Assignee.username" :belongs-to-group="task.GroupId" :task-label="task.Priority"
          :task-status="task.Status" :task-date="task.DueDate" :task-id="task._id" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/store'
import { EventBus } from '../event-bus'
import Task from '../components/Task.vue'
export default {
  data() {
    return {
      groups: [],
      tasks: [],
      assignmentGroupName: '',
      course: ''
    }
  },
  components: {
    Task
  },
  methods: {
    async fetchMyGroups() {
      const response = await fetch('http://localhost:3000/api/groups/getMyGroups', {
        credentials: 'include'
      })
      const data = await response.json()
      this.groups = data
    },
    async fetchMyTasks() {
      const response = await fetch('http://localhost:3000/api/tasks/getUserTasks', {
        credentials: 'include'
      })
      const data = await response.json()
      this.tasks = data
      console.log(this.tasks)
    },
    async createGroup() {
      try {
        const response = await fetch('http://localhost:3000/api/groups/create-group', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            assignmentGroupName: this.assignmentGroupName,
            course: this.course
          })
        })
        const data = await response.json()
        if (response.ok) {
          this.groups.push(data)
        } else {
          console.error('Error creating group:', data.message || 'Unknown error')
        }
      } catch (error) {
        console.error('Error creating group:', error)
      }
    }
  },
  mounted() {
    this.fetchMyGroups()
    this.fetchMyTasks()
  },
  created() {
    EventBus.$on('task-updated', this.fetchMyTasks)
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
  background-color: #1b263b;
  display: flex;
  flex-direction: column;

}

.section {
  max-width: 1200px;
  /* maximum width for the content */
  width: 90%;
  /* occupy 90% of viewport width */
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.section-title {
  color: white;
  font-size: 2em;
  margin-bottom: 16px;
}

.group-card {
  background-color: white;
  color: black;
  padding: 10px;
  font-size: larger;
  font-style: italic;
  font-weight: 500;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-content-1 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.section-content-tasks {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .section-content-1 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .section-content-1 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .section-content-1 {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .section {
    align-items: center;
  }

  .main {
    align-items: center;
  }
}
</style>
