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
    console.log(this.user);
  }
};
</script>

<style></style>
