<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-row align="center">
          <v-col>
            <p id="title" class="text-left display-1">Teams</p>
          </v-col>
          <v-col align="end">
            <div v-if="!canCreateOrJoinTeam">
              {{ createTeamTooltip }}
            </div>
            <v-btn
              to="/teams/create"
              v-on="() => (this.state.show = true)"
              color="secondary"
              :disabled="!canCreateOrJoinTeam"
            >
              Create team
            </v-btn>
          </v-col>
        </v-row>
        <v-divider id="divider" />

        <v-col>
          <v-col v-for="team in teams" :key="team.teamName" no-gutters>
            <team-card
              :teamName="team.teamName"
              :teamTag="team.abbreviation"
              :teamId="team._id"
            />
          </v-col>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TeamCard from '../components/TeamCard.vue';
import { canCreateOrJoinTeam, createTeamTooltip } from '../util/utils';

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
    },
    canCreateOrJoinTeam() {
      //console.log(canCreateOrJoinTeam());
      return canCreateOrJoinTeam();
    },
    createTeamTooltip() {
      return createTeamTooltip();
    }
  },
  created() {
    this.$store.dispatch('retrieveTeams', { page: 0 });
  }
};
</script>

<style scoped>
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
