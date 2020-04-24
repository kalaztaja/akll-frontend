<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('destroyToken');
    this.$router.push({ name: 'front-page' });
  }
};
</script>

<style></style>
