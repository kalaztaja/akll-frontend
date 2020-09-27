<template>
  <v-container fluid v-if="isInThisTeam">
    <h1 class="font-weight-bold">Team matches</h1>
    <div v-for="match in matches" :key="match._id">
      <match-preview :match="match" :teamId="teamId" />
    </div>
  </v-container>
</template>

<script>
import MatchPreview from '../components/MatchPreview.vue';

export default {
  name: 'TeamMatchesView',
  components: {
    MatchPreview
  },
  data() {
    return {
      matches: []
    };
  },
  mounted() {
    this.$store
      .dispatch('getTeamMatches', this.$route.params.id)
      .then(result => {
        this.matches = result.matches;
      })
      .catch(error => {
        this.$store.dispatch('setAlertError', error.response.data.message);
      });
  },
  computed: {
    teamId() {
      return this.$route.params.id;
    },
    isInThisTeam() {
      if (this.$store.getters.loggedIn && this.$store.state.auth.fullUserInfo) {
        return this.$store.state.auth.fullUserInfo.currentTeams.some(
          item => item._id === this.teamId
        );
      }
      return false;
    }
  }
};
</script>

<style></style>
