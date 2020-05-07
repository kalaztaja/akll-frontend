<template>
  <div>
    <create-team />
    <div v-if="this.$store.getters.loggedIn">
      <button v-on="() => this.state.show = true">Create team</button>
    </div>
    <div v-for="team in teams" :key="team.teamName">
      <router-link :to="'/teams/' + team._id" >{{ team.teamName }} {{ team.abbreviation }}</router-link>
    </div>
  </div>
</template>

<script>
import CreateTeamViewVue from './CreateTeamView.vue';

export default {
  name: 'TeamListView',
  components: {
    CreateTeam: CreateTeamViewVue
  },
  state: {
    show: false
  },
  computed: {
    teams() {
      return this.$store.state.team.teams
    }
  },
  created() {
    this.$store.dispatch('retrieveTeams', { page: 0 });
  }
};
</script>

<style></style>
