<!-- TaskLabel.vue -->
<template>
    <span class="label" :class="labelClass">{{ label }}</span>
  </template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    labelClass() {
      switch (this.label.toLowerCase()) {
        case 'urgent':
          return 'urgent'
        case 'chill':
          return 'chill'
        default:
          return 'default-label'
      }
    }
  }
}
</script>

  <style scoped>
  .label {
    border-radius: 15px;
    padding: 2px 10px;
    color: white;
    font-size: 0.8em;
    display: inline-block;
  }

  .urgent {
    background-color: red;
  }

  .chill {
    background-color: #3498db;
  }

  .default-label {
    background-color: grey;
  }
  </style>
