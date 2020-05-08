<template>
  <div>
    <div>
      <button>Create Season</button>
    </div>
    <div v-for="season in seasons" :key="season._id">
      {{ season.seasonName }} {{ season.seasonNumber }} {{ season.division }}
      {{ season.year }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeasonsView',
  state: {},
  computed: {
    seasons() {
      return this.$store.state.season.seasons;
    }
  },
  beforeCreate() {
    this.$store.dispatch('retrieveSeasons', { page: 0 });
  }
};
</script>

<style></style>
