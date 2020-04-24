<template>
  <div>
    <li v-for="team in teams" :key="team.name">{{ team.name }}</li>
  </div>
</template>

<script>
export default {
  name: 'TeamListView',
  components: {},
  data() {
    return {
      teams: []
    };
  },
  created() {
    this.$store.dispatch('retrieveAllTeams').then(response => {
      console.log(response.data);
      this.teams = response.data;
    });
  }
};
</script>

<style></style>
