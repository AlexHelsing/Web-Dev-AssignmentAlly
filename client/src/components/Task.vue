<template>
  <div @click="handleTaskClick" class="task-item">
    <span class="task-code">{{ taskCourse }}</span>
    <span class="task-description">{{ taskDescription }}</span>
    <span class="task-details">
      <TaskLabel :label="taskLabel" />
      <span class="task-date">{{ convertDateToReadableFormat(taskDate) }}</span>
    </span>
  </div>
</template>

<script>
import TaskLabel from './TaskLabel'
import { EventBus } from '../event-bus'

export default {
  name: 'Task',
  components: {
    TaskLabel
  },
  props: {
    taskCourse: {
      type: String,
      default: ''
    },
    taskDescription: {
      type: String,
      default: ''
    },
    taskLabel: {
      type: String,
      default: ''
    },
    taskDate: {
      type: String,
      default: ''
    },
    taskId: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleTaskClick() {
      EventBus.$emit('task-clicked', {
        taskCourse: this.taskCourse,
        taskDescription: this.taskDescription,
        taskLabel: this.taskLabel,
        taskDate: this.taskDate,
        taskId: this.taskId
      })
    },
    convertDateToReadableFormat(date) {
      const dateObj = new Date(date)
      // i want it to look like this: 3 AUG, 6 FEB and so on
      const month = dateObj.toLocaleString('default', { month: 'short' })
      const day = dateObj.getDate()
      return `${day} ${month}`
    }
  }
}

</script>

<style scoped>
.task-item {
  background-color: #0d1319;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

.task-item:hover {
  background-color: #070808;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.task-code {
  flex: 1;
  text-align: left;
  font-weight: bold;
}

.task-description {
  flex: 2;
  text-align: center;
}

.task-details {
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

.task-label,
.task-date {
  margin: 0 7px;
  font-weight: bold;
}
</style>
