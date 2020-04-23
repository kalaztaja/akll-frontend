<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("destroyToken");
    console.log("destroyed");
    this.$router.push({ name: "front-page" });
    console.log("redirected");
  }
};
</script>

<style></style>
