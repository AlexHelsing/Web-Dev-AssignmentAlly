<template>
  <!-- <div>
    <ul>
      <li v-for="group in groups" :key="group.id">{{ group.course }}</li>
    </ul>
  </div> -->
  <div class="main">
    <div class="section">
      <h1 class="section-title">Assignment Groups</h1>
      <div class="section-content-1">
        <router-link v-for="group in groups" :key="group.id" :to="'/group/' + group._id" tag="div" class="rlink">
          <GroupCard :v-for="group in groups" :group="group" />
        </router-link>
        <b-button v-b-modal.modal-1>Create New Group</b-button>
        <b-button v-b-modal.modal-2>Join Existing Group</b-button>
      </div>
      <b-modal id="modal-1" title="Create Assignment Group" centered>
        <b-alert v-model="showCreatingGroupErrorAlert" variant="danger" dismissible fade>
          {{ errorCreatingGroupMessage }}
        </b-alert>
        <div class="mb-3">
          <label for="assignment-group-name" class="form-label">Name</label>
          <input required type="text" id="assignment-group-name" class="form-control" v-model="assignmentGroupName"
            placeholder="Course Name">
        </div>
        <div class="mb-3">
          <label for="course" class="form-label">Course Code</label>
          <input required type="text" id="course" class="form-control" v-model="course" placeholder="Course Code">
        </div>
        <div slot="modal-footer" class="w-100 d-flex justify-content-end">
          <b-button variant="primary" @click="createGroup">Create</b-button>
        </div>
      </b-modal>
      <b-modal id="modal-2" title="Join Existing Group" centered>
        <b-alert v-model="showExistingGroupErrorAlert" variant="danger" dismissible fade>
          {{ errorExistingGroupMessage }}
        </b-alert>
        <div class="mb-3">
          <label for="existing-group-name" class="form-label">Group Name</label>
          <input type="text" id="existing-group-name" class="form-control" v-model="existingGroupName"
            placeholder="Enter Group Name">
        </div>
        <div slot="modal-footer" class="w-100 d-flex justify-content-end">
          <b-button variant="primary" @click="joinGroup">Join</b-button>
        </div>
      </b-modal>
    </div>

    <div class="section">
      <h1 class="section-title">My Tasks</h1>
      <div class="section-content-tasks">
        <div class="empty-list-message" v-if="tasks.length == 0">You're all set!</div>
        <Task v-for="task in tasks" :key="task._id" :task-name="task.TaskName" :task-description="task.Description"
          :task-assignee="task.Assignee.username" :belongs-to-group="task.GroupId" :task-label="task.Priority"
          :task-status="task.Status" :task-date="task.DueDate" :task-id="task._id" />
      </div>
    </div>
    <div class="section">
      <h1 class="section-title">My Meetings</h1>
      <div class="section-content-meetings">
        <div class="empty-list-message" v-if="meetings.length == 0">No meetings scheduled!</div>
        <Meeting v-for="meeting in meetings" :meeting-id="meeting._id" :key="meeting._id"
          :meeting-name="meeting.MeetingName" :belongs-to-group="meeting.GroupId" :meeting-agenda="meeting.MeetingAgenda"
          :meeting-location="meeting.MeetingLocation" :meeting-date="meeting.MeetingDate"
          :meeting-time="meeting.MeetingTime" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/store'
import { EventBus } from '../event-bus'
import { BAlert } from 'bootstrap-vue'
import Task from '../components/Task.vue'
import Meeting from '../components/Meeting.vue'
import GroupCard from '../components/GroupCard.vue'

export default {
  data() {
    return {
      groups: [],
      tasks: [],
      meetings: [],
      assignmentGroupName: '',
      existingGroupName: '',
      course: '',
      showExistingGroupErrorAlert: false,
      showCreatingGroupErrorAlert: false,
      errorCreatingGroupMessage: '',
      errorExistingGroupMessage: ''
    }
  },
  components: {
    Task,
    Meeting,
    BAlert,
    GroupCard
  },
  methods: {
    async fetchMyGroups() {
      const response = await fetch('http://localhost:3000/api/groups/myGroups', {
        credentials: 'include'
      })
      const data = await response.json()
      this.groups = data
    },
    async fetchMyTasks() {
      const response = await fetch('http://localhost:3000/api/tasks/myTasks', {
        credentials: 'include'
      })
      const data = await response.json()
      this.tasks = data
    },
    async createGroup() {
      if (this.assignmentGroupName.length >= 16 || this.course.length >= 16) {
        alert('Group and course name must be 16 characters or less')
        return
      }
      try {
        const response = await fetch('http://localhost:3000/api/groups/', {
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
          this.fetchMyGroups()
          this.$bvModal.hide('modal-1')
        } else {
          console.error('Error creating group:', data.message || 'Unknown error')
          this.errorCreatingGroupMessage = data.message || 'Unknown error'
          this.showCreatingGroupErrorAlert = true
        }
      } catch (error) {
        console.error('Error creating group:', error)
      }
    },
    async fetchMyMeetings() {
      const response = await fetch('http://localhost:3000/api/meetings/myMeetings', {
        credentials: 'include'
      })
      const data = await response.json()
      this.meetings = data
    },
    async joinGroup() {
      try {
        const response = await fetch(`http://localhost:3000/api/groups/${this.existingGroupName}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (response.ok) {
          this.fetchMyGroups()
          this.$bvModal.hide('modal-2')
        } else {
          console.error('Error joining group:', data.message || 'Unknown error')
          this.errorExistingGroupMessage = data.message || 'Unknown error'
          this.showExistingGroupErrorAlert = true
        }
      } catch (error) {
        console.error('Error joining group:', error)
      }
    }
  },

  mounted() {
    this.fetchMyGroups()
    this.fetchMyTasks()
    this.fetchMyMeetings()
  },
  created() {
    EventBus.$on('task-updated', this.fetchMyTasks)
    EventBus.$on('meeting-updated', this.fetchMyMeetings)
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
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.section-title {
  color: white;
  font-size: 2em;
  margin-bottom: 16px;
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

.section-content-meetings {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

/* Modified Media Queries for main component */
@media (max-width: 1200px) {
  .section-content-1 {
    grid-template-columns: repeat(3, 1fr);
  }

  .section-content-tasks,
  .section-content-meetings {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 900px) {
  .section-content-1 {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-content-tasks,
  .section-content-meetings {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .section-content-1 {
    grid-template-columns: 1fr;
  }

  .section-content-tasks,
  .section-content-meetings {
    flex-direction: column;
    width: 100%;
  }

  .section {
    align-items: center;
    padding: 20px;
  }

  .main {
    align-items: center;
  }
}

.empty-list-message {
  color: white;
}

/* Modified Media Queries for main component */
@media (max-width: 1200px) {
  .section-content-1 {
    grid-template-columns: repeat(3, 1fr);
  }

  .section-content-tasks,
  .section-content-meetings {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 900px) {
  .section-content-1 {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-content-tasks,
  .section-content-meetings {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .section-content-1 {
    grid-template-columns: 1fr;
  }

  .section-content-tasks,
  .section-content-meetings {
    flex-direction: column;
    width: 100%;
  }

  .section {
    align-items: center;
  }

  .main {
    align-items: center;
  }

  .rlink {
    cursor: pointer;
  }
}
</style>
