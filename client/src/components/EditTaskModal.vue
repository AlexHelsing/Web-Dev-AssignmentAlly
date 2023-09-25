<template>
  <b-modal size="lg" id="task-detail-modal" ref="taskModal" title="Edit task" centered>
    <div v-if="localTask">
      <label for="task-name" class="form-label">Task Name</label>
      <input required type="text" id="task-name" class="form-control" v-model="localTask.taskName">
    </div>
    <div v-if="localTask" class="mt-3">
      <label class="d-block ">Description</label>
      <b-form-textarea id="task-description" v-model="localTask.taskDescription"></b-form-textarea>
    </div>

    <div v-if="localTask.belongsToGroup" class="mt-3">
      <label for="task-assignee" class="form-label">Assignee</label>
      <b-form-select id="task-assignee" v-model="localTask.taskAssignee"
        :options="localTask.belongsToGroup.members"></b-form-select>
    </div>

    <div v-if="localTask" class="mt-3">
      <label for="task-status" class="form-label">Status</label>
      <b-form-select id="task-status" v-model="localTask.taskStatus" :options="statuses"></b-form-select>
    </div>

    <div v-if="localTask" class="mt-3">
      <label for="task-priority" class="form-label">Priority</label>
      <b-form-select id="task-priority" v-model="localTask.taskLabel"
        :options="['Low', 'Medium', 'High']"></b-form-select>
    </div>

    <div v-if="localTask" class="mt-3">
      <label required for="task-due-date" class="form-label">Due Date</label>
      <input type="date" id="task-due-date" class="form-control" v-model="localTask.taskDate">
    </div>

    <div slot="modal-footer" class="w-100 d-flex justify-content-between">
      <b-button variant="secondary" @click="closeModal">Cancel</b-button>
      <div>
        <b-button class="mr-1" variant="primary" @click="closeModal">Close</b-button>
        <b-button variant="success" @click="saveTask">Save</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
  name: 'EditTaskModal',
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localTask: { ...this.task },
      statuses: ['To Do', 'In Progress', 'Completed']
    }
  },
  watch: {
    task(newValue) {
      this.localTask = { ...newValue }
    }
  },
  created() {
    EventBus.$on('task-clicked', this.showTaskModal)
  },
  beforeDestroy() {
    EventBus.$off('task-clicked', this.showTaskModal)
  },
  methods: {
    closeModal() {
      this.$bvModal.hide('task-detail-modal')
    },
    async saveTask() {
      try {
        console.log(this.localTask)
        const response = await fetch(`http://localhost:3000/api/tasks/update-task/${this.localTask.taskId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            taskName: this.localTask.taskName,
            description: this.localTask.taskDescription,
            assignee: this.localTask.taskAssignee,
            priority: this.localTask.taskLabel,
            dueDate: this.localTask.taskDate,
            status: this.localTask.taskStatus
          })
        })
        const data = await response.json()
        if (response.ok) {
          this.$bvModal.hide('task-detail-modal')
          EventBus.$emit('task-updated')
        } else {
          console.error('Error updating task:', data.message || 'Unknown error')
        }
      } catch (error) {
        console.error('Error updating task:', error)
      }
    },
    showTaskModal(task) {
      this.localTask = {
        ...task,
        taskDate: this.formatDate(task.taskDate)
      }
      this.$bvModal.show('task-detail-modal')
      console.log('task', task)
    },

    formatDate(date) {
      if (!date) return null
      const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-')
      return `${year}-${month}-${day}`
    }
  }
}
</script>
