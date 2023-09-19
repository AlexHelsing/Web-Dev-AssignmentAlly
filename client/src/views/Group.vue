<template>
    <div class="">{{course}}</div>
</template>

<script>
export default {
  data() {
    return {
      groupId: this.$route.params.id,
      course: ''
    }
  },
  methods: {
    async fetchGroup() {
      const response = await fetch(`http://localhost:3000/api/groups/get-course/${this.groupId}`, {
        credentials: 'include'
      })
      const data = await response.json()
      console.log('data', data)
      this.course = data.course
    }
  },
  mounted() {
    this.fetchGroup()
  }
}
</script>
