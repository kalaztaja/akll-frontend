<template>
  <div>
    <h2>{{ season.seasonName }}</h2>
  </div>
</template>

<script>
export default {
  name: 'SeasonView',
  state: {
    show: false
  },
  computed: {
    season() {
      return this.$store.state.season.currentSeason;
    }
  },
  beforeCreate() {
    this.$store.dispatch('retrieveSeason', this.$route.params.id);
  }
};
</script>

<style></style>
