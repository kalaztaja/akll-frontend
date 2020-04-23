<template>
  <div>
    <li v-for="user in users" :key="user.username">{{ user.username }}</li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.$store.dispatch("retrieveAllUsers").then(response => {
      this.users = response.data;
    });
    console.log(this.users);
  }
};
</script>

<style></style>
