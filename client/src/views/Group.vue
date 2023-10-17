<template>
  <main>
    <header class="header">
      <b-avatar-group v-if="members" class="member-container">
        <template v-for="member in members">
          <b-avatar button :key="member.id" @click="fetchMemberData(member._id)" v-b-modal.modal-8 variant="primary"
            class="full-avatar">
            {{ initials(member.username).toUpperCase() }}
          </b-avatar>
        </template>
      </b-avatar-group>
      <b-modal @hidden="handleModalHidden" id="modal-8" title="USER INFO" centered>
        <b-alert v-model="showErrorAlert" variant="danger" dismissible fade>
          {{ errorMessage }}
        </b-alert>
        <div class="mb-3">
          <template v-if="activeMemberData">
            Username: {{ activeMemberData.username }}
          </template>
          <template v-else>
            <div>Loading<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span></div>
          </template>
        </div>
        <div slot="modal-footer" class="w-100 d-flex justify-content-end">
          <b-button class="delete-member-button" variant="danger"
            @click="removeMemberFromGroup(activeMemberData._id)">Remove from
            group</b-button>
        </div>
      </b-modal>
      <h1 class="groupName">{{ group ? group.assignmentGroupName : "..." }}</h1>
      <span class="invite-button-container">
        <button @click="deleteGroup" class="delete-group-button">Delete group</button>
        <button v-b-modal.modal-4 class="invite-button">Invite member</button>
      </span>
      <b-modal @hidden="handleModalHidden" id="modal-4" title="invite member" centered>
        <b-alert v-model="showErrorAlert" variant="danger" dismissible fade>
          {{ errorMessage }}
        </b-alert>
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
          <Task v-for="task in tasks" :task-id="task._id" :key="task._id"
            :task-assignee="task.Assignee && task.Assignee.username ? task.Assignee.username : ''"
            :task-name="task.TaskName" :belongs-to-group="task.GroupId" :task-description="task.Description"
            :task-status="task.Status" :task-label="task.Priority" :task-date="task.DueDate" />
        </div>
        <button v-b-modal.modal-1 class="newTaskButton"> New Task </button>
        <b-modal size="lg" id="modal-1" title="Create Task " centered>
          <div class="mb-3">
            <label for="task-name" class="form-label">Title</label>
            <input required type="text" id="task-name" class="form-control" v-model="taskName" placeholder="Do Q4...">
          </div>
          <div class="mb-3">
            <label for="task-description" class="form-label">Description</label>
            <input required type="text" id="task-description" class="form-control" v-model="taskDescription"
              placeholder="Complete the writeup for Q4...">
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
        <div class="resource-item" v-for="(resource, index) in resources" :key="index">
          <img :src="resource.icon" :class="resource.iconClass" />
          <div v-if="resource.editing" class="resource-edit">
            <input v-model="resource.link" @keyup.enter="toggleEditResourceLink(index)" />
            <button class="edit-resource-button-cancel" @click="cancelEditResourceLink(index)">Cancel</button>
            <button class="edit-resource-button-save" @click="toggleEditResourceLink(index)">Save</button>
          </div>
          <div v-else>
            <a :href="resource.link" v-if="resource.link" target="_blank">{{ resource.name }}</a>
            <span v-else @click="toggleEditResourceLink(index)" class="edit-resource-placeholder">Add {{ resource.name }}
              link</span>
            <button class="edit-resource-button" v-if="resource.link" @click="toggleEditResourceLink(index)">Edit</button>
          </div>
        </div>

      </section>
    </div>

    <div class="meetings-container">
      <h2 class="meetingsheader">Meetings</h2>
      <div class="meetings-list">
        <Meeting v-for="meeting in meetings" :meeting-id="meeting._id" :key="meeting._id"
          :meeting-name="meeting.MeetingName" :belongs-to-group="meeting.GroupId" :meeting-agenda="meeting.MeetingAgenda"
          :meeting-location="meeting.MeetingLocation" :meeting-date="meeting.MeetingDate"
          :meeting-time="meeting.MeetingTime" />
      </div>
      <b-modal size="lg" id="modal-2" title="Create a meeting " centered>
        <div class="mb-3">
          <label for="meeting-name" class="form-label">Name</label>
          <input required type="text" id="meeting-name" class="form-control" v-model="meetingName"
            placeholder="Meeting Name">
        </div>
        <div class="mb-3">
          <label for="meeting-agenda" class="form-label">Agenda</label>
          <input required type="text" id="task-agenda" class="form-control" v-model="meetingAgenda"
            placeholder="Meeting Agenda">
        </div>
        <div class="mb-3">
          <label for="meeting-location" class="form-label">Location</label>
          <select required id="meeting-location" class="form-control" v-model="meetingLocation">
            <option value="discord">Discord</option>
            <option value="campus">Campus</option>
          </select>
        </div>
        <div class="mb-3">
          <label required for="meeting-date" class="form-label">Date</label>
          <input type="date" id="meeting-date" class="form-control" v-model="meetingDate">
        </div>
        <div class="mb-3">
          <label required for="meeting-time" class="form-label">Time</label>
          <b-form-timepicker id="meeting-time" locale="en" v-model="meetingTime"></b-form-timepicker>
        </div>
        <div slot="modal-footer" class="w-100 d-flex justify-content-end">
          <b-button variant="primary" @click="createGroupMeetings">Create</b-button>
        </div>
      </b-modal>

    </div>
    <button v-b-modal.modal-2 class="newMeetingButton"> New Meeting </button>
  </main>
</template>

<script>
import Task from '../components/Task.vue'
import { EventBus } from '../event-bus'
import { store } from '../store/store'
import { BAlert } from 'bootstrap-vue'
import Meeting from '../components/Meeting.vue'

export default {
  components: {
    Task,
    Meeting,
    BAlert
  },
  computed: {
    user() {
      return store.user
    }
  },
  data() {
    return {
      groupIdParam: this.$route.params.id,
      group: null,
      members: [],
      activeMemberData: null,
      tasks: [],
      taskName: '',
      taskDescription: '',
      memberName: '',
      taskPriority: 'Low',
      taskDueDate: '',
      meetings: [],
      meetingName: '',
      meetingAgenda: '',
      meetingLocation: '',
      meetingDate: '',
      meetingTime: '',
      showErrorAlert: false,
      errorMessage: '',
      resources: [
        {
          name: 'Assignment file',
          link: null,
          editing: false,
          icon: '/afileimg.svg',
          iconClass: 'resource-icon-file'
        },
        {
          name: 'Reference Material',
          link: null,
          editing: false,
          icon: '/message-alt-edit-svgrepo-com.svg',
          iconClass: 'resource-icon-ref'
        },
        {
          name: 'Discord',
          link: null,
          editing: false,
          icon: '/discord-icon-svgrepo-com.svg',
          iconClass: 'resource-icon-disc'
        }
      ]
    }
  },
  methods: {
    async fetchGroup() {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}`, {
        credentials: 'include'
      })
      const data = await response.json()
      this.group = data

      if (data && data.resources) {
        const discordResource = data.resources.find(resource => resource.type === 'discord')
        const assignmentFileResource = data.resources.find(resource => resource.type === 'assignment file')
        const referenceMaterialResource = data.resources.find(resource => resource.type === 'reference material')
        if (assignmentFileResource) this.resources[0].link = assignmentFileResource.link
        if (referenceMaterialResource) this.resources[1].link = referenceMaterialResource.link
        if (discordResource) this.resources[2].link = discordResource.link
      }
    },
    async getUsersInGroup() {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}/users`, {
        credentials: 'include'
      })
      const data = await response.json()
      this.members = data
    },
    async deleteGroup() {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok) {
        this.$router.push('/dashboard')
      } else {
        console.error('Error deleting group:', data.message || 'Unknown error')
      }
    },
    async getGroupTasks() {
      const response = await fetch(`http://localhost:3000/api/tasks/getTasksByGroup/${this.groupIdParam}`, {
        credentials: 'include'
      })
      const data = await response.json()
      this.tasks = data
    },

    async createGroupTask() {
      if (!this.taskName || !this.taskDescription || !this.taskPriority || !this.taskDueDate) {
        alert('Please fill out all fields')
        return
      }
      const response = await fetch(`http://localhost:3000/api/tasks/${this.groupIdParam}`, {
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
      this.$bvModal.hide('modal-1')
      this.tasks.push(data)

      // clear the form
      this.taskName = ''
      this.taskDescription = ''
      this.taskPriority = 'Low'
      this.taskDueDate = ''
    },
    async getGroupMeetings() {
      const response = await fetch(`http://localhost:3000/api/meetings/${this.groupIdParam}`, {
        credentials: 'include'
      })
      const data = await response.json()
      this.meetings = data
    },
    async removeMemberFromGroup(memberId) {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}/users/${memberId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok) {
        this.members = this.members.filter(member => member._id !== memberId)
        this.$bvModal.hide('modal-8')
      } else {
        console.error('Error removing member from group:', data.message || 'Unknown error')
        this.errorMessage = data.message || 'Unknown error'
        this.showErrorAlert = true
      }
    },
    async createGroupMeetings() {
      if (!this.meetingName || !this.meetingAgenda || !this.meetingDate || !this.meetingLocation) {
        alert('Please fill out all required fields')
        return
      }
      const response = await fetch(`http://localhost:3000/api/meetings/${this.groupIdParam}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          meetingName: this.meetingName,
          date: this.meetingDate,
          meetingAgenda: this.meetingAgenda,
          time: this.meetingTime,
          meetingLocation: this.meetingLocation
        })
      })
      const data = await response.json()
      this.meetings.push(data)
      this.$bvModal.hide('modal-2')

      // clear the form
      this.meetingName = ''
      this.meetingAgenda = ''
      this.meetingLocation = ''
      this.meetingDate = ''
      this.meetingTime = ''
    },

    async inviteMember() {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.memberName
        })
      })
      const data = await response.json()

      if (response.ok) {
        this.getUsersInGroup()
        this.getGroupTasks()
        this.$bvModal.hide('modal-4')
      } else {
        console.error('Error inviting member:', data.message || 'Unknown error')
        this.errorMessage = data.message || 'Unknown error'
        this.showErrorAlert = true
      }
    },
    async fetchMemberData(memberId) {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}/users/${memberId}`, {
        credentials: 'include'
      })
      const data = await response.json()

      if (response.ok) {
        this.activeMemberData = data
      } else {
        console.error('Error fetching member data:', data.message || 'Unknown error')
      }
    },
    initials(member) {
      const name = member
      return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`
    },
    toggleEditResourceLink(index) {
      this.resources[index].editing = !this.resources[index].editing
      if (!this.resources[index].editing) {
        this.updateResourceLink(index)
      }
    },
    cancelEditResourceLink(index) {
      this.resources[index].editing = false
    },
    handleModalHidden() {
      this.showErrorAlert = false
      this.errorMessage = ''
    },
    async updateResourceLink(index) {
      const resource = this.resources[index]

      if (resource && resource.name) {
        const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}/set-resource/${resource.name.toLowerCase()}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            link: resource.link
          })
        })
        const data = await response.json()

        if (response.ok) {
          const updatedResource = data.resources.find((r) => r.type === resource.name.toLowerCase())
          if (updatedResource) resource.link = updatedResource.link
        } else {
          console.error('Error updating resource link:', data.message || 'Unknown error')
        }
      } else {
        console.error('Resource or resource.name is undefined at index:', index)
      }
    }
  },
  mounted() {
    this.fetchGroup()
    this.getUsersInGroup()
    this.getGroupTasks()
    this.getGroupMeetings()
  },
  created() {
    EventBus.$on('task-updated', function () {
      this.getGroupTasks()
    }.bind(this))
    EventBus.$on('meeting-updated', function () {
      this.getGroupMeetings()
    }.bind(this))
  }
}

</script>

<style>
main {
  background-color: #1b263b;
  flex-grow: 1;
  display: flex !important;
  flex-direction: column;
}

.header {
  background-color: #e5e5e5;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
}

.groupName {
  order: 2;
  font-weight: bold;
  flex-grow: 1;
  padding-top: 13px;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 240px;
}

.member-container {
  order: 1;
  margin-right: 20px;
}

.invite-button-container {
  font-size: 14px;
  order: 3;
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    font-size: 7px;
  }
}

.invite-button {
  background-color: #6c757d;
  color: whitesmoke;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

}

.delete-group-button {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  order: 3;
}

.delete-group-button:hover {
  scale: 1.025;
}

.invite-button:hover {
  scale: 1.025;
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

.edit-resource-placeholder {
  cursor: pointer;
  color: #7289da;
  text-decoration: underline;
}

.resource-edit input {
  margin-right: 5px;
}

.left {
  width: 75%;
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

.resource-icon-disc {
  margin-right: 10px;
  height: 30px;
}

.resource-icon-file {
  margin-right: 10px;
  height: 30px;
  color: #00ff26;
}

.resource-icon-ref {
  margin-right: 10px;
  height: 35px;
}

.edit-resource-button {
  background-color: #7289da;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  text-align: center;
  margin-left: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.edit-resource-button-cancel {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  text-align: center;
  margin-left: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.edit-resource-button-save {
  background-color: #00ff26;
  color: #2e2e2e;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  text-align: center;
  margin-left: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;

}

.resource-link {
  margin: 20px 0;
  display: flex;
  align-items: center;
  background-color: #7289da;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
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

.meetings-container {
  color: aliceblue;
  flex-grow: 1;
  padding-left: 20px;
  padding-right: 20px;
  border-top: 2px solid #0c0b15;
  display: flex;
  flex-direction: column;
}

.meetings-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
  padding: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

}

.meetingsheader {
  margin-top: 20px;
}

.newMeetingButton {
  background-color: #34a8eb;
  color: #ffffff;
  margin-bottom: 10px;
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;

  @media screen and (max-width: 768px) {
    position: relative;
  }
}

.newMeetingButton:hover {
  background-color: #2c90d4;
  transform: translateY(-2px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.newMeetingButton:active {
  transform: translateY(0px);
}

.delete-member-button {
  background-color: #1324c1;
  color: #ffffff;
  border: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  order: 3;
}

.avatar-button {
  padding: 0;
  border: none;
  background: none;
  position: relative;
  margin-left: 5px;
}

.full-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10rem;
  /* adjust as needed */
  background-color: #3498db;
  color: #fff;
  font-weight: bold;
}
</style>
