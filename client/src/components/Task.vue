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
.task-item:hover {
  background-color: #070808;
  transform: scale(1.03);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #3a3f4b;
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
