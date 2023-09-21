<template>
  <b-modal id="task-detail-modal" ref="taskModal" title="Task Details" centered>
    <div v-if="localTask">
      <label class="d-block mb-2">Title:</label>
      <b-form-input v-model="localTask.taskCode"></b-form-input>
    </div>

    <div v-if="localTask" class="mt-3">
      <label class="d-block mb-2">Description:</label>
      <b-form-textarea v-model="localTask.taskDescription"></b-form-textarea>
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
      localTask: { ...this.task },
      labelOptions: [] // not sure which we are using yet..
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
    saveTask() {
      this.$emit('task-updated', this.localTask) // Example event emitted after saving task.
    },
    showTaskModal(task) {
      this.localTask = { ...task }
      this.$bvModal.show('task-detail-modal')
    }
  }
}
</script>
