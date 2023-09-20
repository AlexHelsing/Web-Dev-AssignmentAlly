<template>
    <div class="task-item">
        <span class="task-code">{{ taskCode }}</span>
        <span class="task-description">{{ taskDescription }}</span>
        <span class="task-details">
            <TaskLabel :label="taskLabel" />
            <span class="task-date">{{ taskDate }}</span>
        </span>
    </div>
</template>

<script>
import TaskLabel from './TaskLabel'

export default {
  name: 'Task',
  components: {
    TaskLabel
  },
  props: {
    taskCode: {
      type: String,
      default: ''
    },
    taskDescription: {
      type: String,
      default: ''
    },
    taskLabel: {
      type: String,
      default: 'chill'
    },
    taskDate: {
      type: String,
      default: ''
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

.task-code {

  text-align: left;
}

.task-description {

  text-align: center;
}

.task-details {

  display: flex;
  align-items: center;  /* Center vertically */
}

.task-label,
.task-date {
  margin: 0 2px;  /* Reduced margin for closer placement */
}
</style>
