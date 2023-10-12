<template>
  <div id="meeting-container" @click="handleMeetingClick">
    <div id="meeting-item">
      <img class="locationbox" :src="imageSource" alt="">
      <div class="meetinginfo">
        <div>{{ meetingName }}</div>
        <div>{{ meetingAgenda }}</div>
      </div>
    </div>
    <div id="meeting-bottom">
      <div class="belongs-to-group">{{ belongsToGroup.course }}</div>
      <div class="meeting-time">{{ convertDateToReadableFormat(meetingDate) }} {{ meetingTime }}</div>
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
#meeting-item {
  gap: 7px;
  height: 8rem;
  border-radius: 8px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}

#meeting-container {
  display: flex;
  flex-direction: column;
  background-color: #0d1319;
  color: white;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 8px
}

#meeting-container:hover {
  background-color: #070808;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.belongs-to-group {
  font-weight: bold;
  margin-left: 5px;
}

.meetinginfo {
  display: flex;
  flex: 7;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
}

#meeting-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #181935;
  padding: 10px;
}

.locationbox {
  border-radius: 8px;
  object-fit: contain;
  width: 80px;
  height: 80px;

}
</style>
