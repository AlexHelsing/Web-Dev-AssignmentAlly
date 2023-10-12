<template>
    <div class="main">
        <div class="section">
            <h1 class="section-title">All assignment groups</h1>
            <div class="section-content-1">
                <router-link v-for="group in groups" :key="group.id" :to="'/group/' + group._id" tag="div"
                    class="router-link-wrapper">
                    <b-card class="group-card">
                        <b-card-text>
                            {{ group.assignmentGroupName }}
                        </b-card-text>
                    </b-card>
                </router-link>
                <button @click="deleteAllGroups" class="delete-all-groups-btn">DELETE ALL GROUPS</button>
            </div>
        </div>
        <div class="section">
            <h1 class="section-title">All meetings</h1>
            <div class="section-content-meetings">
                <Meeting v-for="meeting in meetings" :meeting-id="meeting._id" :key="meeting._id"
                    :meeting-name="meeting.MeetingName" :meeting-description="meeting.Description"
                    :meeting-date="meeting.Date" :meeting-time="meeting.Time" :meeting-location="meeting.Location"
                    :meeting-attendees="meeting.Attendees" :meeting-organizer="meeting.Organizer.username" />
            </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      groups: [],
      meetings: []
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
    }
  },
  mounted() {
    this.getGroups()
    this.getMeetings()
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
