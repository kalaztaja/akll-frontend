<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-row align="center">
          <v-col>
            <p id="title" class="text-left; font-weight-medium">Teams</p>
          </v-col>
          <v-col align="end">
            <v-btn
              v-if="this.$store.getters.loggedIn"
              to="/teams/create"
              v-on="() => (this.state.show = true)"
              color="secondary"
              >Create team</v-btn
            >
          </v-col>
        </v-row>
        <v-divider id="divider"></v-divider>

        <v-row>
          <v-col v-for="team in teams" :key="team.teamName" no-gutters>
            <team-card
              :teamName="team.teamName"
              :teamTag="team.abbreviation"
              :teamId="team._id"
            ></team-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TeamCard from '../components/TeamCard.vue';

export default {
  name: 'TeamListView',
  components: {
    TeamCard
  },
  state: {
    show: false
  },
  computed: {
    teams() {
      return this.$store.state.team.teams;
    }
  },
  created() {
    this.$store.dispatch('retrieveTeams', { page: 0 });
  }
};
</script>

<style>
#title {
  font-size: 1.2em;
  margin-bottom: 0px;
  vertical-align: middle;
}
#divider {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
