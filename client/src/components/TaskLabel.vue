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
      console.log('label', this.label)
      switch (this.label.toLowerCase()) {
        case 'high':
          return 'high'
        case 'medium':
          return 'medium'
        case 'low':
          return 'low'
        default:
          return ''
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
  font-weight: bold;
  display: inline-block;
}

.high {
  background-color: red;
}

.medium {
  background-color: #3498db;
}

.low {
  background-color: grey;
}
</style>
