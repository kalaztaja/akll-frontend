<template>
  <p>Welcome, {{ this.userId }}</p>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      user: Object,
      userId: Number
    };
  },
  created() {
    this.userId = this.$route.params.id;
    this.$store.dispatch('getUserInfo', this.userId).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  }
};
</script>

<style></style>
