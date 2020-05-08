<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.commit('clearSession');
    this.$router.push({ name: '' });
  }
};
</script>

<style></style>
