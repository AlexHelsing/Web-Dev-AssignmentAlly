<template>
  <div class="main">
    <div class="section">
      <h1 class="section-title">All assignment groups</h1>
      <div class="section-content-1">
        <router-link v-for="group in groups" :key="group.id" :to="'/group/' + group._id" tag="div"
          class="router-link-wrapper">
          <b-card class="group-card">
            <div class="group-info">
              <b-card-text class="group-title">
                {{ group.assignmentGroupName }}
              </b-card-text>
              <div class="group-course">
                <div class="course-code">{{ group.course }}</div>
              </div>
            </div>
            <div v-if="group.members" class="group-members">
              <b-avatar variant="primary" v-for="member in group.members" :key="member._id" class="avatar">
                {{ initials(member.username).toUpperCase() }}
              </b-avatar>
            </div>
          </b-card>
        </router-link>
        <button @click="deleteAllGroups" class="delete-all-groups-btn">DELETE ALL GROUPS</button>
      </div>
    </div>
    <div class="section">
      <h1 class="section-title">All meetings</h1>
      <div class="section-content-meetings">
        <Meeting v-for="meeting in meetings" :meeting-id="meeting._id" :key="meeting._id"
          :meeting-name="meeting.MeetingName" :belongs-to-group="meeting.GroupId" :meeting-agenda="meeting.MeetingAgenda"
          :meeting-location="meeting.MeetingLocation" :meeting-date="meeting.MeetingDate"
          :meeting-time="meeting.MeetingTime" />
        <button @click="deleteAllMeetings" class="delete-all-groups-btn">DELETE ALL MEETINGS</button>
      </div>
    </div>
    <div class="section">
      <h1 class="section-title">All tasks</h1>
      <div class="section-content-tasks">
        <Task v-for="task in tasks" :key="task._id" :task-name="task.TaskName" :task-description="task.Description"
          :task-assignee="task.Assignee.username" :belongs-to-group="task.GroupId" :task-label="task.Priority"
          :task-status="task.Status" :task-date="task.DueDate" :task-id="task._id" />
        <button @click="deleteAllTasks" class="delete-all-groups-btn">DELETE ALL TASKS</button>
      </div>
    </div>
  </div>
</template>

<script>
import Meeting from '../components/Meeting.vue'
import Task from '../components/Task.vue'
export default {
  components: {
    Meeting,
    Task
  },
  data() {
    return {
      groups: [],
      meetings: [],
      tasks: []
    }
  },
  methods: {
    getGroups: async function () {
      try {
        const response = await fetch('http://localhost:3000/api/groups', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        this.groups = data
        console.log('data', data)
      } catch (error) {
        console.error('Error creating group:', error)
      }
    },
    getMeetings: async function () {
      try {
        const response = await fetch('http://localhost:3000/api/meetings', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        this.meetings = data
        console.log('data', data)
      } catch (error) {
        console.error('Error creating group:', error)
      }
    },
    getTasks: async function () {
      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        this.tasks = data
        console.log('data', data)
      } catch (error) {
        console.error('Error creating group:', error)
      }
    },
    async deleteAllGroups() {
      try {
        const response = await fetch('http://localhost:3000/api/groups', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log('data', data)
        if (response.ok) {
          this.groups = []
        } else {
          console.error('Error creating group:', data.message || 'Unknown error')
        }
      } catch (error) {
        console.error('Error creating group:', error)
      }
    },
    async deleteAllMeetings() {
      try {
        const response = await fetch('http://localhost:3000/api/meetings', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log('data', data)
        if (response.ok) {
          this.meetings = []
        } else {
          console.error('Error creating group:', data.message || 'Unknown error')
        }
      } catch (error) {
        console.error('Error creating group:', error)
      }
    },
    async deleteAllTasks() {
      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log('data', data)
        if (response.ok) {
          this.tasks = []
        } else {
          console.error('Error creating group:', data.message || 'Unknown error')
        }
      } catch (error) {
        console.error('Error creating group:', error)
      }
    },
    initials(member) {
      const name = member
      return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`
    }
  },
  mounted() {
    this.getGroups()
    this.getMeetings()
    this.getTasks()
  }
}

</script>

<style>
.delete-all-groups-btn {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
