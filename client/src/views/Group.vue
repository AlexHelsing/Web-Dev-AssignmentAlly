<template>
  <main>
    <header class="header">
      <b-avatar-group v-if="group" class="member-container">
        <b-avatar variant="secondary" v-for="member in group.members" :key="member.id">{{ initials(member).toUpperCase()
        }}</b-avatar>
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
          <Task v-for="task in tasks" :task-id="task._id" :key="task._id"
            :task-assignee="task.Assignee && task.Assignee.username ? task.Assignee.username : ''"
            :task-name="task.TaskName" :belongs-to-group="task.GroupId" :task-description="task.Description"
            :task-status="task.Status" :task-label="task.Priority" :task-date="task.DueDate" />
        </div>
        <button v-b-modal.modal-1 class="newTaskButton"> New Task </button>
        <b-modal size="lg" id="modal-1" title="Create a task " centered>
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
        <div class="resource-item">
          <img src="../../public/discord-icon-svgrepo-com.svg" class="resource-icon" />
          <div v-if="editingDiscordLink" class="discord-edit">
            <input v-model="discordLink" @keyup.enter="toggleEditDiscordLink" />
            <button class="edit-discord-button-cancel" @click="cancelEditDiscordLink">Cancel</button>
            <button class="edit-discord-button-save" @click="toggleEditDiscordLink">Save</button>
          </div>
          <div v-else>
            <a :href="discordLink" v-if="discordLink" target="_blank">Discord</a>
            <span v-else @click="toggleEditDiscordLink" class="edit-discord-placeholder">Add Discord link</span>
            <button class="edit-discord-button" v-if="discordLink" @click="toggleEditDiscordLink">Edit</button>
          </div>
        </div>
      </section>
    </div>

    <div class="meetings-container">
      <h2 class="meetingsheader">Meetings</h2>
      <div class="meetings-list">
        <Meeting v-for="meeting in meetings" :meeting-id="meeting._id" :key="meeting._id"
            :meeting-name="meeting.MeetingName" :belongs-to-group="meeting.GroupId" :meeting-agenda="meeting.MeetingAgenda"
            :meeting-location="meeting.MeetingLocation" :meeting-date="meeting.MeetingDate" :meeting-time="meeting.MeetingTime" />
      </div>
      <button v-b-modal.modal-2 class="newMeetingButton"> New Meeting </button>
      <b-modal size="lg" id="modal-2" title="Create a meeting " centered>
          <div class="mb-3">
            <label for="meeting-name" class="form-label">Name</label>
            <input required type="text" id="meeting-name" class="form-control" v-model="meetingName" placeholder="Meeting Name">
          </div>
          <div class="mb-3">
            <label for="meeting-agenda" class="form-label">Agenda</label>
            <input required type="text" id="task-agenda" class="form-control" v-model="meetingAgenda"
              placeholder="Meeting Agenda">
          </div>
          <div class="mb-3">
            <label for="meeting-location" class="form-label">Location</label>
            <input required type="text" id="meeting-location" class="form-control" v-model="meetingLocation"
              placeholder="Meeting Location">
          </div>
          <div class="mb-3">
            <label required for="meeting-date" class="form-label">Date</label>
            <input type="date" id="meeting-date" class="form-control" v-model="meetingDate">
          </div>
          <div class="mb-3">
            <label required for="meeting-time" class="form-label">Time</label>
            <input type="text" id="meeting-time" class="form-control" v-model="meetingTime">
          </div>
          <div slot="modal-footer" class="w-100 d-flex justify-content-end">
            <b-button variant="primary" @click="createGroupMeetings">Create</b-button>
          </div>
        </b-modal>

    </div>
  </main>
</template>

<script>
import Task from '../components/Task.vue'
import { EventBus } from '../event-bus'
import Meeting from '../components/Meeting.vue'

export default {
  components: {
    Task,
    Meeting
  },
  data() {
    return {
      groupIdParam: this.$route.params.id,
      group: null,
      tasks: [],
      taskName: '',
      taskDescription: '',
      memberName: '',
      taskPriority: 'Low',
      taskDueDate: '',
      editingDiscordLink: false,
      discordLink: null,
      meetings: [],
      meetingName: '',
      meetingAgenda: '',
      meetingLocation: '',
      meetingDate: '',
      meetingTime: ''

    }
  },
  methods: {
    async fetchGroup() {
      const response = await fetch(`http://localhost:3000/api/groups/get-course/${this.groupIdParam}`, {
        credentials: 'include'
      })
      const data = await response.json()
      console.log('data', data)
      this.group = data

      if (data && data.resources) {
        const discordResource = data.resources.find(resource => resource.type === 'discord')
        if (discordResource) this.discordLink = discordResource.link
      }
    },
    async getGroupTasks() {
      const response = await fetch(`http://localhost:3000/api/tasks/getTasksByGroup/${this.groupIdParam}`, {
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
      const response = await fetch(`http://localhost:3000/api/tasks/create-task/${this.groupIdParam}`, {
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
      this.$bvModal.hide('modal-1')
    },
    async getGroupMeetings() {
      const response = await fetch(`http://localhost:3000/api/meetings/getMeetingsByGroup/${this.groupIdParam}`, {
        credentials: 'include'
      })
      const data = await response.json()
      console.log(data)
      this.meetings = data
    },

    async createGroupMeetings() {
      if (!this.meetingName || !this.meetingAgenda || !this.meetingDate || !this.meetingLocation) {
        alert('Please fill out all required fields')
        return
      }
      const response = await fetch(`http://localhost:3000/api/meetings/create-meeting/${this.groupIdParam}`, {
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
      console.log(data)
      this.meetings.push(data)
      this.$bvModal.hide('modal-2')
    },

    async inviteMember() {
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}/invite/${this.memberName}`, {
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
        // edit modal doesnt get the new member data unless we refectch
        this.getGroupTasks()
        this.$bvModal.hide('modal-4')
      } else {
        console.error('Error inviting member:', data.message || 'Unknown error')
      }
    },
    initials(member) {
      const name = member
      return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`
    },
    toggleEditDiscordLink() {
      this.editingDiscordLink = !this.editingDiscordLink
      if (!this.editingDiscordLink) {
        this.updateDiscordLink()
      }
    },
    cancelEditDiscordLink() {
      this.editingDiscordLink = false
    },
    async updateDiscordLink() {
      if (!this.discordLink.match(/^https:\/\/.*discord.*\/[a-zA-Z0-9]+/)) {
        alert('Please enter a valid Discord invitation link!')
        this.editingDiscordLink = true
        return
      }
      const response = await fetch(`http://localhost:3000/api/groups/${this.groupIdParam}/set-resource/discord`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          link: this.discordLink
        })
      })
      const data = await response.json()

      if (response.ok) {
        const discordLink = data.resources.find((resource) => resource.type === 'discord')
        this.discordLink = discordLink.link
      } else {
        console.error('Error updating discord link:', data.message || 'Unknown error')
      }
    }
  },
  mounted() {
    this.fetchGroup()
    this.getGroupTasks()
    this.getGroupMeetings()
  },
  created() {
    EventBus.$on('task-updated', function () {
      this.getGroupTasks()
    }.bind(this))
  }
}

</script>

<style>
main {
  background-color: #1b263b;
}

.header {
  background-color: #e5e5e5;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.groupName {
  order: 2;
  padding-top: 13px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.member-container {
  order: 1;
  margin-right: 20px;
}

.invite-button {
  background-color: #6c757d;
  color: whitesmoke;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  order: 3;
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

.edit-discord-placeholder {
  cursor: pointer;
  color: #7289da;
  text-decoration: underline;
}

.discord-edit input {
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

.resource-icon {
  margin-right: 10px;
  height: 30px;
}

.edit-discord-button {
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

.edit-discord-button-cancel {
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

.edit-discord-button-save {
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
  padding: 20px;
  border-top: 2px solid #0c0b15;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
}

.meetings-list{
  display: flex;
  flex-grow: 1;
  padding-right: 10px;
  margin-bottom: 20px;
  flex-direction: column;
  height: 250px;
  gap: 10px;
}

.newMeetingButton {
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

.newMeetingButton:hover {
  background-color: #2c90d4;
  transform: translateY(-2px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.newMeetingButton:active {
  transform: translateY(0px);
}

</style>
