<template>
  <div />
</template>

<script>
export default {
  created() {
    this.$store.dispatch('setAlertSuccess', 'Logout succesfully');
    this.$store.commit('clearSession');
    this.$router.push({ name: 'post-view' });
  }
};
</script>

<style></style>
