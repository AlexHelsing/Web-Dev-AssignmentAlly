<template>
  <b-modal id="task-detail-modal" ref="taskModal" title="Edit task" centered>
    <div v-if="localTask">
      <label class="d-block mb-2">Description:</label>
      <b-form-textarea id="task-description" v-model="localTask.taskDescription"></b-form-textarea>
    </div>

    <div v-if="localTask" class="mt-3">
      <label for="task-priority" class="form-label">Priority</label>
      <select id="task-priority" class="form-control" v-model="localTask.taskLabel">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <div v-if="localTask" class="mt-3">
      <label required for="task-due-date" class="form-label">Due Date</label>
      <input type="date" id="task-due-date" class="form-control" v-model="localTask.taskDate">
    </div>

    <div slot="modal-footer" class="w-100 d-flex justify-content-between">
      <b-button variant="secondary" @click="closeModal">Cancel</b-button>
      <div>
        <b-button variant="success" @click="saveTask">Save</b-button>
        <b-button variant="primary" @click="closeModal">Close</b-button>
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
      localTask: { ...this.task }
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
        const response = await fetch(`http://localhost:3000/api/tasks/update-task/${this.localTask.taskId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            description: this.localTask.taskDescription,
            priority: this.localTask.taskLabel,
            dueDate: this.localTask.taskDate
          })
        })
        const data = await response.json()
        if (response.ok) {
          this.$bvModal.hide('task-detail-modal')
          this.$emit('task-updated', this.localTask)
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
    },

    formatDate(date) {
      if (!date) return null
      const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-')
      return `${year}-${month}-${day}`
    }
  }
}
</script>
