<template>
  <v-flex v-if="isInThisTeam">
    <v-card-text>
      <v-row class="stable-row" align="center" justify="center">
        <v-btn-toggle v-model="tabToggle">
          <v-btn>Calendar</v-btn>
          <v-btn>Info</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
    <div v-if="tabToggle === 0" class="priority-class">
      <TeamPreview :team1Id="team1Id" :team2Id="team2Id" />
      <div v-if="timeslot === null">
        <SharedCalendar v-bind:matchId="matchId" v-bind:matchProp="match" />
      </div>
      <div v-else>
        <v-card v-if="match.matchPlayed === false">
          <v-card-title>Timeslot for game: {{ timeslot }}</v-card-title>
          <v-card-title class="font-weight-thin">
            Paste this to your console to connect to your server
          </v-card-title>
          <v-card-text>
            connect
            {{ match.csgo.server.ip }}:{{ match.csgo.server.port }};password
            {{ match.csgo.server.password }}
          </v-card-text>
          <v-card>
            <v-dialog v-model="cancelDialog">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="my-4" block dark v-bind="attrs" v-on="on">
                  Cancel Match
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  Are you sure you want to cancel the match?
                </v-card-title>
                <v-card-text>
                  Cancelling match forces you and your opponent to lock on new
                  timeslot for the match If you cancel the timeslot, please make
                  sure that the opponents are aware of this
                </v-card-text>
                <v-card-actions>
                  <v-btn class="my-4 mx-4" @click="cancelDialog = false">
                    Back
                  </v-btn>
                  <v-spacer />
                  <v-btn class="my-4 mx-4" @click="cancelMatch()">
                    Cancel match
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-card>
        <v-card v-else>
          <v-card-title>Match has been played</v-card-title>
          <v-card-text>
            Visit challonge to see the result. We are working on bringing the
            results here during this season of AKL
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div v-if="tabToggle === 1" class="priority-class">
      <v-card>
        <v-card-title>{{ $t('MatchDetailGuideTitle') }}</v-card-title>
        <v-card-text>{{ $t('MatchDetailGuideMessage1') }}</v-card-text>
        <v-card-text>{{ $t('MatchDetailGuideMessage2') }}</v-card-text>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
import SharedCalendar from '../components/SharedCalendar.vue';
import TeamPreview from '../components/TeamPreview.vue';
import moment from 'moment';

export default {
  name: 'TeamMatchDetail',
  components: {
    SharedCalendar,
    TeamPreview
  },
  data() {
    return {
      match: {},
      team1Id: '',
      team2Id: '',
      tabToggle: 0,
      cancelDialog: false
    };
  },
  computed: {
    matchId() {
      return this.$route.params.matchid;
    },
    timeslot() {
      if (this.match.acceptedTimeslot) {
        var start = moment(this.match.acceptedTimeslot.startTime).format(
          'YYYY-MM-DD HH:mm'
        );
        return start;
      }
      return null;
    },
    isInThisTeam() {
      if (this.$store.getters.loggedIn && this.$store.state.auth.fullUserInfo) {
        return this.$store.state.auth.fullUserInfo.currentTeams.some(
          item => item._id === this.team1Id || item._id === this.team2Id
        );
      }
      return false;
    }
  },
  created() {
    if (this.match !== {}) {
      this.$store
        .dispatch('getMatchById', this.matchId)
        .then(result => {
          this.match = result;
          this.team1Id = this.match.teamOne.coreId;
          this.team2Id = this.match.teamTwo.coreId;
        })
        .catch(error => {
          this.$store.dispatch('setAlertError', error.response.data.message);
        });
    }
  },
  methods: {
    cancelMatch() {
      this.cancelDialog = false;
      this.$store
        .dispatch('requestMatchCancel', this.matchId)
        .then(() => {
          this.$store.dispatch(
            'setAlertSuccess',
            'Match cancelled succesfully! Refreshing...'
          );
          setTimeout(function() {
            location.reload(true);
          }, 3000);
        })
        .catch(error => {
          this.$store.dispatch('setAlertError', error.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
.stable-row {
  top: 70px;
  width: 100%;
  z-index: 0;
}
.priority-class {
  z-index: 1;
}
</style>
