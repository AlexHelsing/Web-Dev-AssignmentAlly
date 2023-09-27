<template>
  <div @click="handleMeetingClick" class="meeting-item">
    <img :src="imageSource" class="locationbox" />
    <div class="meetinginfo">
      <span class="meetingname">{{ meetingName }}</span>
      <span class="meetingagenda">{{ meetingAgenda }}</span>
      <span class="meetingdetails">
        <span class="meetingdate">{{ convertDateToReadableFormat(meetingDate) }}</span>
        <span class="meetingtime">{{ meetingTime }}</span>
      </span>
    </div>
  </div>
</template>

<script>

import { EventBus } from '../event-bus'

export default {
  name: 'Meeting',
  props: {
    meetingName: {
      type: String,
      default: ''
    },
    meetingAgenda: {
      type: String,
      default: ''
    },
    meetingDate: {
      type: String,
      default: ''
    },
    meetingTime: {
      type: String,
      default: ''
    },
    meetingLocation: {
      type: String,
      default: ''
    },
    belongsToGroup: {
      type: Object,
      default: () => ({})
    },
    meetingId: {
      type: String,
      default: ''
    }
  },
  computed: {
    imageSource() {
      return this.meetingLocation === 'discord' ? '/discord-icon-svgrepo-com.svg' : '/campus-svgrepo-com.svg'
    }
  },
  methods: {
    handleMeetingClick() {
      EventBus.$emit('meeting-clicked', {
        // Should convert this to a task type but its impossible in this shity language
        meetingName: this.meetingName,
        meetingAgenda: this.meetingAgenda,
        meetingDate: this.meetingDate,
        meetingTime: this.meetingTime,
        meetingId: this.meetingId,
        meetingLocation: this.meetingLocation,
        belongsToGroup: this.belongsToGroup
      })
    },
    convertDateToReadableFormat(date) {
      const dateObj = new Date(date)
      const month = dateObj.toLocaleString('default', { month: 'short' })
      const day = dateObj.getDate()
      return `${day} ${month}`
    },
    initials(member) {
      if (!member) return ''
      const name = member
      // should prolly create a avatar component for this shit instead of doing magic on the name in every component
      return name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
    }
  }
}

</script>

<style scoped>
.meeting-item {
  background-color: #0d1319;
  color: white;
  padding: 10px 15px;
  gap: 7px;
  height: 8rem;
  border-radius: 8px;
  display: flex;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

.meeting-item:hover {
  background-color: #070808;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.meetinginfo {
  display: flex;
  flex: 7;
  flex-direction: column;
  justify-content: space-around;
}

.meetingdetails {
  display: flex;
  gap: 5px;
}

.locationbox {

  border-radius: 10%;
  /* Or you can use a specific value like 50px */
  /* Or you can use a specific value like 50px */
  object-fit: contain;
  /* or 'contain' based on your preference */
}
</style>
