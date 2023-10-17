<template>
    <div class="group-card">
      <div class="group-info">
        <div class="group-title" v-html="formattedTitle"></div>
        <div class="group-course">
          <div class="course-code">{{ group.course }}</div>
        </div>
      </div>
      <div v-if="group.members" class="group-members">
        <div class="avatar" v-for="member in group.members" :key="member._id">
          {{ initials(member.username).toUpperCase() }}
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true,
      default: () => ({
        assignmentGroupName: '',
        course: '',
        members: []
      })
    }
  },
  methods: {
    initials(name) {
      return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`
    }
  },
  computed: {
    formattedTitle() {
      return this.group.assignmentGroupName.replace(/(.{20})/g, '$1<br>')
    }
  }
}
</script>

  <style scoped>
 .group-card {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e1e1e1;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    height: 200px;  /* Fixed height */
    transition: background-color 0.3s ease;

    @media screen and (max-width: 600px) {
        height: auto;
    }
}
.group-card:hover {
  background-color: #e0f2f1;
  /* Change the background color on hover */
}

.group-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.group-title {
    font-size: 24px;
    font-weight: 800;
    font-style: italic;
    margin-bottom: 10px;
    text-align: center;
    color: black;
    word-wrap: break-word;
    text-decoration: none;
}

.group-course {
    margin-top: 10px;
    text-align: center;
}
.course-code {
    color: #211919;
    font-weight: bold;
    font-size: medium;
}
.group-card a:hover {
    text-decoration: none;
}
.group-members {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    justify-content: center;
}

.avatar {
    width: 40px;
    height: 40px;
    background-color: #007bff;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}
  </style>
