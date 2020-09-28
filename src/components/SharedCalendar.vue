<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>{{ $t('MatchDetailTitle') }}</v-card-title>
        <v-row>
          <v-dialog
            ref="startDateDialog"
            v-model="startDateDialog"
            :return-value.sync="suggestedStartDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="suggestedStartDate"
                :label="$t('MatchDetailStart1')"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mx-5"
              />
            </template>
            <v-date-picker v-model="suggestedStartDate" scrollable>
              <v-spacer />
              <v-btn text color="primary" @click="startDateDialog = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.startDateDialog.save(suggestedStartDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-dialog
            ref="endDateDialog"
            v-model="endDateDialog"
            :return-value.sync="suggestedEndDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="suggestedEndDate"
                :label="$t('MatchDetailEnd1')"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mx-5"
              />
            </template>
            <v-date-picker v-model="suggestedEndDate" scrollable>
              <v-spacer />
              <v-btn text color="primary" @click="endDateDialog = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.endDateDialog.save(suggestedEndDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-row>
        <v-row>
          <v-dialog
            ref="startTimeDialog"
            v-model="startTimeDialog"
            :return-value.sync="suggestedStartTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="suggestedStartTime"
                :label="$t('MatchDetailStart2')"
                prepend-icon="mdi-clock-time-eight-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mx-5"
              />
            </template>
            <v-time-picker
              v-if="startTimeDialog"
              v-model="suggestedStartTime"
              full-width
              format="24h"
            >
              <v-spacer />
              <v-btn text color="primary" @click="startTimeDialog = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.startTimeDialog.save(suggestedStartTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <v-dialog
            ref="endTimeDialog"
            v-model="endTimeDialog"
            :return-value.sync="suggestedEndTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="suggestedEndTime"
                :label="$t('MatchDetailEnd2')"
                prepend-icon="mdi-clock-time-eleven-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mx-5"
              />
            </template>
            <v-time-picker
              v-if="endTimeDialog"
              v-model="suggestedEndTime"
              full-width
              format="24h"
            >
              <v-spacer />
              <v-btn text color="primary" @click="endTimeDialog = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.endTimeDialog.save(suggestedEndTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-row>
        <v-container class="my-2">
          <v-row>
            <v-btn
              class="mx-2"
              depressed
              color="primary"
              @click="clearProposals()"
            >
              Clear
            </v-btn>
            <v-spacer />
            <v-btn
              depressed
              float-right
              color="primary"
              class="mx-2"
              @click="proposeTime()"
            >
              Send suggestion
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
      <event-calendar class="calendar-class" v-bind:eventArray="events" />
    </v-col>
  </v-row>
</template>

<script>
import EventCalendar from '../components/EventCalendar.vue';
import moment from 'moment';

export default {
  name: 'SharedCalendar',
  components: {
    EventCalendar
  },
  props: {
    matchId: {
      type: String,
      default: ''
    },
    matchProp: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    today: '2020-10-01',
    type: 'month',
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    typeOptions: [
      { text: 'Day', value: 'day' },
      { text: 'Week', value: 'week' },
      { text: 'Month', value: 'month' }
    ],
    colors: ['blue', 'deep-purple', 'green', 'grey darken-1'],
    events: [],

    suggestedStartTime: null,
    suggestedEndTime: null,
    startTimeDialog: false,
    endTimeDialog: false,
    suggestedStartDate: null,
    startDateDialog: false,
    suggestedEndDate: null,
    endDateDialog: false,
    match: {},
    userTeamIds: []
  }),
  mounted() {
    this.match = this.matchProp;
    const userId = this.$store.getters.userInfo._id;
    this.$store
      .dispatch('getUserInfoById', userId)
      .then(result => {
        this.userTeamIds = result.currentTeams;
      })
      .then(() => {
        this.$store.dispatch('getMatchById', this.matchId).then(result => {
          this.match = result;
          this.mapMatchToTimeslots();
        });
      });
  },
  methods: {
    proposeTime() {
      if (
        this.suggestedStartTime !== null &&
        this.suggestedDate !== null &&
        this.suggestedEndTime !== null
      ) {
        var startTimeslot = moment(
          this.suggestedStartTime + this.suggestedStartDate,
          'YYYY-MM-DD HH:MM'
        );
        var endTimeslot = moment(
          this.suggestedEndTime + this.suggestedEndDate,
          'YYYY-MM-DD HH:MM'
        );

        console.log('Starting timeslot ' + startTimeslot);
        console.log('Ending timeslot ' + endTimeslot);
        const body = {
          matchId: this.matchId,
          startTime: startTimeslot.toISOString(),
          endTime: endTimeslot.toISOString()
        };
        this.$store
          .dispatch('proposeTimeslot', body)
          .then(() => {
            this.$store.dispatch(
              'setAlertSuccess',
              'Suggestion send succesfully! Refresh the page to update calendar'
            );
          })
          .catch(error => {
            this.$store.dispatch('setAlertError', error.data.message);
          });
      } else {
        this.$store.dispatch('setAlertError', 'Choose a date and time');
      }
    },
    mapMatchToTimeslots() {
      const eventArray = [];
      this.match.proposedTimeslots.forEach(element => {
        var color = 'black';
        var name = 'Other reservation';
        var inProposingTeam = false;
        this.userTeamIds.forEach(teamElement => {
          if (teamElement._id === element.proposerTeamId) {
            inProposingTeam = true;
          }
        });
        if (inProposingTeam) {
          color = 'orange';
          name = 'Own team proposal';
        } else {
          name = 'Opponent proposal';
          color = 'cyan';
        }
        var startValue = element.startTime.substring(0, 10);
        var startTime = element.startTime.substring(12, 16);
        var endValue = element.endTime.substring(0, 10);
        var endTime = element.endTime.substring(12, 16);
        var startTimeSlot = startValue + ' ' + startTime;
        var endTimeSlot = endValue + ' ' + endTime;
        eventArray.push({
          start: startTimeSlot,
          end: endTimeSlot,
          name: name,
          color: color,
          _id: element._id,
          matchId: this.matchId
        });
      });
      this.events = eventArray;
    },
    clearProposals() {
      this.suggestedStartTime = null;
      this.suggestedStartDate = null;
      this.suggestedEndTime = null;
      this.suggestedEndDate = null;
    }
  }
};
</script>

<style scoped>
.submit-button {
  right: 0;
}
.priority {
  z-index: 2;
}
.calendar-class {
  margin-bottom: 50px;
}
</style>
