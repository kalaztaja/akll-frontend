<template>
  <div>
    {{ team.teamName }}
  </div>
</template>

<script>
export default {
  name: 'TeamView',
  state: {
    show: false
  },
  computed: {
    team() {
      return this.$store.state.team.currentTeam;
    }
  },
  beforeCreate() {
    this.$store.dispatch('retrieveTeam', this.$route.params.id);
  }
};
</script>

<style></style>
