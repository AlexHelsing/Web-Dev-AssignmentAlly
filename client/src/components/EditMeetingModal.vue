<template>
  <b-modal size="lg" id="meeting-detail-modal" ref="meetingModal" title="Edit meeting" centered hide-footer>
    <div v-if="localMeeting">
      <label for="meeting-name" class="form-label">Name</label>
      <input required type="text" id="meeting-name" class="form-control" v-model="localMeeting.meetingName">
    </div>
    <div v-if="localMeeting" class="mt-3">
      <label class="d-block ">Agenda</label>
      <b-form-textarea id="meeting-agenda" v-model="localMeeting.meetingAgenda"></b-form-textarea>
    </div>

    <div v-if="localMeeting" class="mt-3">
      <label for="meeting-location" class="form-label">Location</label>
      <b-form-select id="meeting-location" v-model="localMeeting.meetingLocation">
        <b-form-select-option value="discord">Discord</b-form-select-option>
        <b-form-select-option value="campus">Campus</b-form-select-option>
      </b-form-select>
    </div>

    <div v-if="localMeeting" class="mt-3">
      <label required for="meeting-date" class="form-label">Date</label>
      <input type="date" id="meeting-date" class="form-control" v-model="localMeeting.meetingDate">
    </div>

    <div v-if="localMeeting" class="mt-3">
      <label for="meeting-time" class="form-label">Time</label>
      <b-form-timepicker id="meeting-time" locale="en" v-model="localMeeting.meetingTime"></b-form-timepicker>
    </div>

    <div class="mt-4">
      <div class="d-flex justify-content-between">
        <div>
          <b-button variant="danger" @click="deleteMeeting">Delete Meeting</b-button>
        </div>
        <div>
          <b-button variant="primary" @click="closeModal" class="text-white mr-2">Close</b-button>
          <b-button variant="success" @click="saveMeeting">Save</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
  name: 'EditMeetingModal',
  props: {
    meeting: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localMeeting: { ...this.meeting }
    }
  },
  watch: {
    meeting(newValue) {
      this.localMeeting = { ...newValue }
    }
  },
  created() {
    EventBus.$on('meeting-clicked', this.showMeetingModal)
  },
  beforeDestroy() {
    EventBus.$off('meeting-clicked', this.showMeetingModal)
  },
  methods: {
    closeModal() {
      this.$bvModal.hide('meeting-detail-modal')
    },
    async saveMeeting() {
      try {
        const response = await fetch(`http://localhost:3000/api/meetings/${this.localMeeting.meetingId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            meetingName: this.localMeeting.meetingName,
            meetingAgenda: this.localMeeting.meetingAgenda,
            meetingDate: this.localMeeting.meetingDate,
            meetingTime: this.localMeeting.meetingTime,
            meetingLocation: this.localMeeting.meetingLocation
          })
        })
        const data = await response.json()
        if (response.ok) {
          this.$bvModal.hide('meeting-detail-modal')
          EventBus.$emit('meeting-updated')
        } else {
          console.error('Error updating meeting:', data.message || 'Unknown error')
        }
      } catch (error) {
        console.error('Error updating meeting:', error)
      }
    },
    async deleteMeeting() {
      try {
        const response = await fetch(`http://localhost:3000/api/meetings/${this.localMeeting.meetingId}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        const data = await response.json()
        if (response.ok) {
          this.$bvModal.hide('meeting-detail-modal')
          EventBus.$emit('meeting-updated')
        } else {
          console.error('Error deleting meeting:', data.message || 'Unknown error')
        }
      } catch (error) {
        console.error('Error deleting meeting:', error)
      }
    },
    showMeetingModal(meeting) {
      this.localMeeting = {
        ...meeting,
        meetingDate: this.formatDate(meeting.meetingDate)
      }
      this.$bvModal.show('meeting-detail-modal')
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-')
      return `${year}-${month}-${day}`
    }
  }
}
</script>
