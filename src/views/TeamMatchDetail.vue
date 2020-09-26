<template>
  <v-flex>
    <TeamPreview v-bind:team1Id="team1Id" v-bind:team2Id="team2Id" />
    <SharedCalendar v-bind:matchId="matchId" v-bind:match="match" />
  </v-flex>
</template>

<script>
import SharedCalendar from '../components/SharedCalendar.vue';
import TeamPreview from '../components/TeamPreview.vue';

export default {
  name: 'TeamMatchDetail',
  components: {
    SharedCalendar,
    TeamPreview
  },
  data() {
    return {
      match: {}
    };
  },
  computed: {
    matchId() {
      return this.$route.params.matchid;
    },
    team1Id() {
      return this.match.teamOne.coreId;
    },
    team2Id() {
      return this.match.teamTwo.coreId;
    }
  },
  created() {
    if (this.match !== {}) {
      this.$store
        .dispatch('getMatchById', this.matchId)
        .then(result => {
          console.log(result);
          this.match = result.matches;
        })
        .catch(error => {
          this.$store.dispatch('setAlertError', error.response);
        });
    }
  }
};
</script>

<style></style>
