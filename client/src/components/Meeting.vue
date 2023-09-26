<template>
    <div @click="handleMeetingClick" class="meeting-item">
      <span class="meeting-code-container">
        <span class="meeting-code">{{ belongsToGroup.course }}</span>
        <span class="separator">|</span>
        <span class="meeting-name">{{ meetingName }}</span>
      </span>
      <span class="meeting-description">{{ meetingAgenda }}</span>
      <span class="meeting-details">
        <span class="meeting-date">{{ convertDateToReadableFormat(meetingDate) }}</span>
        <span class="meeting-time">{{ meetingTime }}</span>
      </span>
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
    belongsToGroup: {
      type: Object,
      default: () => ({})
    },
    meetingId: {
      type: String,
      default: ''
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
  border-radius: 8px;
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

.meeting-item:hover {
  background-color: #070808;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.avatar {
  margin-right: 10px;
  height: 30px;
}

.meeting-code-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.meeting-name {
  font-size: 0.8rem;
}

.separator {
  margin: 0 5px;
}

.meeting-code {
  font-weight: bold;
}

.meeting-description {
  flex: 2;
  text-align: center;
}

.meeting-details {
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

.meeting-date {
  margin: 0 7px;
  font-weight: bold;
}
</style>
