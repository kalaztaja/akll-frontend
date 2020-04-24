<template>
  <p>Welcome, {{ user.username }}</p>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      user: Object
    };
  },
  created() {
    this.$store.dispatch('retrieveUserInfo', {}).then(response => {
      this.user = response.data;
    });
  }
};
</script>

<style></style>
