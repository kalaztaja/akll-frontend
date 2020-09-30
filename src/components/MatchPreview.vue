<template>
  <v-card :to="toUrl">
    <v-container fluid>
      <v-row>
        <v-card-title>Match number: {{ match.challongeRound }}</v-card-title>
        <v-spacer />
        <div v-if="match.matchPlayed !== false">
          <v-card-title class="font-weight-thin">
            Match has been played
          </v-card-title>
        </div>
        <div v-if="match.acceptedTimeslot === null">
          <v-card-title class="font-weight-thin">
            Match time not yet locked
          </v-card-title>
        </div>
        <div
          v-if="match.acceptedTimeslot !== null && match.matchPlayed === false"
        >
          <v-card-title class="font-weight-thin">
            Match will be played: {{ timeslot }}
          </v-card-title>
        </div>
      </v-row>
      <v-row>
        <v-card-title class="font-weight-regular">
          {{ match.teamOne.name }}
        </v-card-title>
        <v-card-title>VERSUS</v-card-title>
        <v-card-title class="font-weight-regular">
          {{ match.teamTwo.name }}
        </v-card-title>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MatchPreview',
  props: {
    match: {
      type: Object,
      required: true
    },
    teamId: {
      type: String,
      required: true
    },
    link: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    timeslot() {
      if (this.match.acceptedTimeslot) {
        const start = moment(this.match.acceptedTimeslot.startTime).format(
          'YYYY-MM-DD HH:mm'
        );
        return start;
      }
      return null;
    },
    toUrl() {
      if (this.link) {
        return '/teams/matches/' + this.match._id;
      } else {
        return null;
      }
    }
  }
};
</script>

<style></style>
