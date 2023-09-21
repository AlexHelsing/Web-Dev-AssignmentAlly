<template>
  <main>
    <header class="header">
      <b-avatar-group v-if="group" class="member-container">
        <b-avatar v-for="member in group.members" :key="member.id">{{ member }}</b-avatar>
      </b-avatar-group>
      <h1 class="groupName">{{ group ? group.assignmentGroupName : "..." }}</h1>
      <button v-b-modal.modal-4 class="invite-button">Invite member</button>
      <b-modal id="modal-4" title="invite member" centered>
        <div class="mb-3">
          <label for="member-name" class="form-label">Member Name</label>
          <input type="text" id="member-name" class="form-control" v-model="memberName" placeholder="Enter member name">
        </div>
        <div slot="modal-footer" class="w-100 d-flex justify-content-end">
          <b-button variant="primary" @click="inviteMember">Invite</b-button>
        </div>
      </b-modal>
    </header>

    <div class="task-resource-container">
      <section class="left">
        <h1>Tasks</h1>
        <div class="task-list">
          <Task v-for="task in tasks" :task-id="task._id" :key="task._id" :task-course="group ? group.course : '...'"
            :task-description="task.Description" :task-label="task.Priority" :task-date="task.DueDate" />
        </div>
        <button v-b-modal.modal-1 class="newTaskButton"> New Task </button>
        <b-modal id="modal-1" title="Create a task " centered>
          <div class="mb-3">
            <label for="task-name" class="form-label">Task Name, gotta specify our data better</label>
            <input required type="text" id="task-name" class="form-control" v-model="taskName" placeholder="taskname">
          </div>
          <div class="mb-3">
            <label for="task-description" class="form-label">description</label>
            <input required type="text" id="task-description" class="form-control" v-model="taskDescription"
              placeholder="description">
          </div>
          <div class="mb-3">
            <label for="task-priority" class="form-label">Priority</label>
            <select id="task-priority" class="form-control" v-model="taskPriority">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div class="mb-3">
            <label required for="task-due-date" class="form-label">Due Date</label>
            <input type="date" id="task-due-date" class="form-control" v-model="taskDueDate">
          </div>
          <div slot="modal-footer" class="w-100 d-flex justify-content-end">
            <b-button variant="primary" @click="createGroupTask">Create</b-button>
          </div>
        </b-modal>
      </section>
      <section class="right">
        <div class="right-header">Resources & Info</div>
        <div class="resource-item">
          <span class="resource-icon">[Icon]</span>
          <a href="#">Assignment File</a>
        </div>
        <div class="resource-item">
          <span class="resource-icon">[Icon]</span>
          <a href="#">Reference Material</a>
        </div>
        <div class="resource-item" href="#">
          <span class="resource-icon">[Icon]</span>
          <a href="#">Discord</a>
        </div>
        <div class="deadline">
          <span class="resource-icon">[Icon]</span>
          Deadline: 25th December
        </div>
      </section>
    </div>

    <div class="meetings-container">
      <h2>Upcoming Meetings or some shit</h2>

    </div>
  </main>
</template>

<script>
import Task from '../components/Task.vue'
import { EventBus } from '../event-bus'

export default {
  components: {
    Task
  },
  data() {
    return {
      groupId: this.$route.params.id,
      group: null,
      tasks: [],
      taskName: '',
      taskDescription: '',
      memberName: '',
      taskPriority: 'Low',
      taskDueDate: ''
    }
  },
  methods: {
    async fetchGroup() {
      const response = await fetch(`http://localhost:3000/api/groups/get-course/${this.groupId}`, {
        credentials: 'include'
      })
      const data = await response.json()
      console.log('data', data)
      this.group = data
    },
    async getGroupTasks() {
      const response = await fetch(`http://localhost:3000/api/tasks/getTasksByGroup/${this.groupId}`, {
        credentials: 'include'
      })
      const data = await response.json()
      console.log(data)
      this.tasks = data
    },
    async createGroupTask() {
      if (!this.taskName || !this.taskDescription || !this.taskPriority || !this.taskDueDate) {
        alert('Please fill out all fields')
        return
      }
      const response = await fetch(`http://localhost:3000/api/tasks/create-task/${this.groupId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskName: this.taskName,
          course: this.group.course,
          description: this.taskDescription,
          priority: this.taskPriority,
          dueDate: this.taskDueDate
        })
      })
      const data = await response.json()
      console.log(data)
      this.tasks.push(data)
    },
    async inviteMember() {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupId}/invite/${this.memberName}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        this.group.members.push(this.memberName)
      } else {
        console.error('Error inviting member:', data.message || 'Unknown error')
      }
    }
  },
  mounted() {
    this.fetchGroup()
    this.getGroupTasks()
  },
  created() {
    EventBus.$on('task-updated', function () {
      this.getGroupTasks()
    }.bind(this))
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

.groupName {
  order: 2;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.member-container {
  order: 1;
  margin-right: 20px;
}

.invite-button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  order: 3;
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
  align-items: stretch;
  color: aliceblue;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}

.left {
  width: 55%;
  background-color: #1b263b;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.right {
  width: 45%;
  padding: 20px;
  background-color: #0c0b15;
  color: #dddfd8;
  font-family: Arial, sans-serif;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.right-header {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  border-bottom: 2px solid #e0e1dd;
  padding-bottom: 10px;
}

.resource-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.resource-icon {
  margin-right: 10px;
}

.deadline {
  color: red;
  margin: 20px 0;
  font-weight: bold;
}

.discord-link {
  margin: 20px 0;
  display: flex;
  align-items: center;
  background-color: #7289da;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
}

.meetings-container {
  padding: 20px;
  background-color: #f3f4f6;
}

.task-list {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 10px;
  height: 250px;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 20px;
}
</style>
